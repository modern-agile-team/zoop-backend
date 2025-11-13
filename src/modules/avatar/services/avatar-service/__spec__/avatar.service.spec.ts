import { Test } from '@nestjs/testing';

import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { AvatarService } from '@module/avatar/services/avatar-service/avatar.service';
import { AVATAR_SERVICE } from '@module/avatar/services/avatar-service/avatar.service.interface';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(AvatarService, () => {
  let service: AvatarService;

  let avatarRepository: AvatarRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ClsModuleFactory(), AvatarRepositoryModule, EventStoreModule],
      providers: [
        {
          provide: AVATAR_SERVICE,
          useClass: AvatarService,
        },
      ],
    }).compile();

    service = module.get<AvatarService>(AVATAR_SERVICE);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  describe(AvatarService.prototype.assignRandomAvatar, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let avatar: Avatar;

    beforeEach(async () => {
      avatar = await avatarRepository.insert(AvatarFactory.build());
    });

    describe('아바타를 할당하면', () => {
      it('아바타가 할당 할 아바타를 반환해야한다.', () => {
        expect(service.assignRandomAvatar()).resolves.toEqual({
          avatarFileName: expect.any(String),
        });
      });
    });
  });
});
