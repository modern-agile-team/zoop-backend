import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffectFactory } from '@module/sound-effect/entities/__spec__/sound-effect.factory';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { UpdateSoundEffectCommandFactory } from '@module/sound-effect/use-cases/update-sound-effect/__spec__/update-sound-effect-command.factory';
import { UpdateSoundEffectCommand } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.command';
import { UpdateSoundEffectHandler } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.handler';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(UpdateSoundEffectHandler.name, () => {
  let handler: UpdateSoundEffectHandler;

  let soundEffectRepository: SoundEffectRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: UpdateSoundEffectCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        SoundEffectRepositoryModule,
        EventStoreModule,
      ],
      providers: [UpdateSoundEffectHandler],
    }).compile();

    handler = module.get<UpdateSoundEffectHandler>(UpdateSoundEffectHandler);

    soundEffectRepository = module.get<SoundEffectRepositoryPort>(
      SOUND_EFFECT_REPOSITORY,
    );
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = UpdateSoundEffectCommandFactory.build();
  });

  describe('효과음을 수정하면', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let soundEffect: SoundEffect;

    beforeEach(async () => {
      soundEffect = await soundEffectRepository.insert(
        SoundEffectFactory.build({
          id: command.soundEffectId,
        }),
      );
    });

    it('효과음이 수정되어야한다.', async () => {
      await expect(handler.execute(command)).resolves.toEqual(
        expect.objectContaining({
          name: command.name,
          description: command.description,
        }),
      );
    });
  });

  describe('효과음이 존재하지 않는 경우', () => {
    it('효과음이 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        SoundEffectNotFoundError,
      );
    });
  });
});
