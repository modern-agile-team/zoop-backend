import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffectFactory } from '@module/sound-effect/entities/__spec__/sound-effect.factory';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectRepository } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';

import { generateEntityId } from '@common/base/base.entity';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(SoundEffectRepository, () => {
  let repository: SoundEffectRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory()],
      providers: [
        {
          provide: SOUND_EFFECT_REPOSITORY,
          useClass: SoundEffectRepository,
        },
      ],
    }).compile();

    repository = module.get<SoundEffectRepositoryPort>(SOUND_EFFECT_REPOSITORY);
  });

  describe(SoundEffectRepository.prototype.findOneById, () => {
    let soundEffectId: string;

    beforeEach(() => {
      soundEffectId = generateEntityId();
    });

    describe('식별자와 일치하는 리소스가 존재하는 경우', () => {
      let soundEffect: SoundEffect;

      beforeEach(async () => {
        soundEffect = await repository.insert(
          SoundEffectFactory.build({ id: soundEffectId }),
        );
      });

      describe('리소스를 조회하면', () => {
        it('리소스가 반환돼야한다.', async () => {
          await expect(repository.findOneById(soundEffectId)).resolves.toEqual(
            soundEffect,
          );
        });
      });
    });
  });

  describe(SoundEffectRepository.prototype.findAllOffsetPaginated, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let soundEffects: SoundEffect[];

    beforeEach(async () => {
      soundEffects = await Promise.all(
        SoundEffectFactory.buildList(5).map((soundEffect) =>
          repository.insert(soundEffect),
        ),
      );
    });

    describe('페이지를 조회하면', () => {
      it('페이지가 반환되어야한다.', async () => {
        await expect(
          repository.findAllOffsetPaginated({
            pageInfo: { offset: 0, limit: 2 },
          }),
        ).resolves.toEqual({
          data: expect.toSatisfyAll(
            (soundEffect: unknown) => soundEffect instanceof SoundEffect,
          ),
          limit: expect.any(Number),
          offset: expect.any(Number),
          totalCount: expect.any(Number),
        });
      });
    });
  });
});
