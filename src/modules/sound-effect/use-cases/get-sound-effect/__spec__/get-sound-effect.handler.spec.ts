import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffectFactory } from '@module/sound-effect/entities/__spec__/sound-effect.factory';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { GetSoundEffectQueryFactory } from '@module/sound-effect/use-cases/get-sound-effect/__spec__/get-sound-effect-query.factory';
import { GetSoundEffectHandler } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.handler';
import { GetSoundEffectQuery } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(GetSoundEffectHandler.name, () => {
  let handler: GetSoundEffectHandler;

  let soundEffectRepository: SoundEffectRepositoryPort;

  let query: GetSoundEffectQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), SoundEffectRepositoryModule],
      providers: [GetSoundEffectHandler],
    }).compile();

    handler = module.get<GetSoundEffectHandler>(GetSoundEffectHandler);

    soundEffectRepository = module.get<SoundEffectRepositoryPort>(
      SOUND_EFFECT_REPOSITORY,
    );
  });

  beforeEach(() => {
    query = GetSoundEffectQueryFactory.build();
  });

  describe('효과음을 조회하면', () => {
    let soundEffect: SoundEffect;

    beforeEach(async () => {
      soundEffect = await soundEffectRepository.insert(
        SoundEffectFactory.build({
          id: query.soundEffectId,
        }),
      );
    });

    it('효과음이 반화되어야한다.', async () => {
      await expect(handler.execute(query)).resolves.toEqual(soundEffect);
    });
  });

  describe('식별자와 일치하는 효과음이 존재하지 않는 경우', () => {
    it('효과음이 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(query)).rejects.toThrow(
        SoundEffectNotFoundError,
      );
    });
  });
});
