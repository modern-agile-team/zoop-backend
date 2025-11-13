import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffectFactory } from '@module/sound-effect/entities/__spec__/sound-effect.factory';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { ListSoundEffectsQueryFactory } from '@module/sound-effect/use-cases/list-sound-effects/__spec__/list-sound-effects-query.factory';
import { ListSoundEffectsHandler } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.handler';
import { ListSoundEffectsQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(ListSoundEffectsHandler.name, () => {
  let handler: ListSoundEffectsHandler;

  let soundEffectRepository: SoundEffectRepositoryPort;

  let query: ListSoundEffectsQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), SoundEffectRepositoryModule],
      providers: [ListSoundEffectsHandler],
    }).compile();

    handler = module.get<ListSoundEffectsHandler>(ListSoundEffectsHandler);

    soundEffectRepository = module.get<SoundEffectRepositoryPort>(
      SOUND_EFFECT_REPOSITORY,
    );
  });

  beforeEach(() => {
    query = ListSoundEffectsQueryFactory.build({ page: 1, perPage: 20 });
  });

  describe('효과음 페이지를 조회하면', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let soundEffects: SoundEffect[];

    beforeEach(async () => {
      soundEffects = await Promise.all(
        SoundEffectFactory.buildList(5).map((soundEffect) =>
          soundEffectRepository.insert(soundEffect),
        ),
      );
    });

    it('효과음 페이지가 반환돼야한다.', async () => {
      const result = await handler.execute(query);

      expect(result).toBeDefined();
      expect(result.data.length).toBeGreaterThanOrEqual(5);
      expect(result.currentPage).toBe(query.page ?? 1);
      expect(result.perPage).toBe(query.perPage ?? 20);
      expect(result.totalCount).toBeGreaterThanOrEqual(5);
    });
  });
});
