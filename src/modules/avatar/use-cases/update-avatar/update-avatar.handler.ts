import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { UpdateAvatarCommand } from '@module/avatar/use-cases/update-avatar/update-avatar.command';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarHandler
  implements ICommandHandler<UpdateAvatarCommand, Avatar>
{
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async execute(command: UpdateAvatarCommand): Promise<Avatar> {
    const avatar = await this.avatarRepository.findOneById(command.avatarId);

    if (avatar === undefined) {
      throw new AvatarNotFoundError();
    }

    avatar.update({
      name: command.name,
      description: command.description,
    });

    await this.avatarRepository.update(avatar);

    await this.eventStore.storeAggregateEvents(avatar);

    return avatar;
  }
}
