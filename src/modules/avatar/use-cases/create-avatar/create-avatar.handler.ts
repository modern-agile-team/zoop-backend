import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { CreateAvatarCommand } from '@module/avatar/use-cases/create-avatar/create-avatar.command';

import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(CreateAvatarCommand)
export class CreateAvatarHandler
  implements ICommandHandler<CreateAvatarCommand, unknown>
{
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
    @Inject(AWS_S3_PORT)
    private readonly awsS3Adapter: AwsS3Port,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async execute(command: CreateAvatarCommand): Promise<unknown> {
    const avatar = Avatar.create({
      originalFileName: command.originalFileName,
      name: command.name
        ? command.name
        : command.originalFileName.replace(/\.[^/.]+$/, ''),
      extension: command.extension,
      contentLength: command.contentLength,
      contentType: command.contentType,
      width: command.width,
      height: command.height,
      description: command.description,
    });

    await this.avatarRepository.insert(avatar);

    await this.eventStore.storeAggregateEvents(avatar);

    await this.awsS3Adapter.uploadFile({
      file: command.buffer,
      type: 'avatar',
      fileName: avatar.fileName,
      contentType: avatar.contentType,
    });

    return avatar;
  }
}
