import { Test, TestingModule } from '@nestjs/testing';

import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { UpdateAvatarCommandFactory } from '@module/avatar/use-cases/update-avatar/__spec__/update-avatar-command.factory';
import { UpdateAvatarCommand } from '@module/avatar/use-cases/update-avatar/update-avatar.command';
import { UpdateAvatarHandler } from '@module/avatar/use-cases/update-avatar/update-avatar.handler';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(UpdateAvatarHandler.name, () => {
  let handler: UpdateAvatarHandler;

  let avatarRepository: AvatarRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: UpdateAvatarCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), AvatarRepositoryModule, EventStoreModule],
      providers: [UpdateAvatarHandler],
    }).compile();

    handler = module.get<UpdateAvatarHandler>(UpdateAvatarHandler);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = UpdateAvatarCommandFactory.build();
  });

  describe('아바타를 업데이트 하면', () => {
    let avatar: Avatar;

    beforeEach(async () => {
      avatar = await avatarRepository.insert(
        AvatarFactory.build({ id: command.avatarId }),
      );
    });

    it('아바타를 업데이트 해야한다.', async () => {
      await expect(handler.execute(command)).resolves.toEqual(
        expect.objectContaining({
          id: avatar.id,
          name: command.name,
          description: command.description,
        }),
      );
    });
  });

  describe('아바타가 존재하지 않는 경우', () => {
    it('아바타가 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        AvatarNotFoundError,
      );
    });
  });
});
