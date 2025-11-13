import { Inject, Injectable } from '@nestjs/common';

import { Transactional } from '@nestjs-cls/transactional';

import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { IAvatarService } from '@module/avatar/services/avatar-service/avatar.service.interface';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@Injectable()
export class AvatarService implements IAvatarService {
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async assignRandomAvatar(): Promise<{ avatarFileName: string }> {
    const avatars = await this.avatarRepository.findAllOffsetPaginated({
      pageInfo: {
        offset: 0,
        limit: 1,
      },
      order: [
        { field: 'usageCount', direction: 'asc' },
        { field: 'createdAt', direction: 'asc' },
      ],
    });

    const avatar = avatars.data[0];

    avatar.assign();

    await this.avatarRepository.update(avatar);

    await this.eventStore.storeAggregateEvents(avatar);

    return { avatarFileName: avatar.fileName };
  }
}
