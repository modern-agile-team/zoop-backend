import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { AvatarInUsedError } from '@module/avatar/errors/avatar-in-used.error';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { DeleteAvatarCommand } from '@module/avatar/use-cases/delete-avatar/delete-avatar.command';

import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarHandler
  implements ICommandHandler<DeleteAvatarCommand, void>
{
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryPort,
    @Inject(AWS_S3_PORT)
    private readonly awsS3Adapter: AwsS3Port,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async execute(command: DeleteAvatarCommand): Promise<void> {
    const avatar = await this.avatarRepository.findOneById(command.avatarId);

    if (avatar === undefined) {
      throw new AvatarNotFoundError();
    }

    const avatarUsingAccounts =
      await this.accountRepository.findManyByAvatarFileNames(
        new Set([avatar.fileName]),
      );

    if (avatarUsingAccounts.length > 0) {
      throw new AvatarInUsedError();
    }

    avatar.delete();

    await this.avatarRepository.delete(avatar);

    await this.eventStore.storeAggregateEvents(avatar);

    await this.awsS3Adapter.deleteFile({
      type: 'avatar',
      fileName: avatar.fileName,
    });
  }
}
