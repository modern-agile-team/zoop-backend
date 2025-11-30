import { Test, TestingModule } from '@nestjs/testing';

import { BackgroundMusicFactory } from '@module/background-music/entities/__spec__/background-music.factory';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { BackgroundMusicRepository } from '@module/background-music/repositories/background-music/background-music.repository';
import {
  BACKGROUND_MUSIC_REPOSITORY,
  BackgroundMusicRepositoryPort,
} from '@module/background-music/repositories/background-music/background-music.repository.port';

import { generateEntityId } from '@common/base/base.entity';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(BackgroundMusicRepository, () => {
  let repository: BackgroundMusicRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory()],
      providers: [
        {
          provide: BACKGROUND_MUSIC_REPOSITORY,
          useClass: BackgroundMusicRepository,
        },
      ],
    }).compile();

    repository = module.get<BackgroundMusicRepositoryPort>(
      BACKGROUND_MUSIC_REPOSITORY,
    );
  });

  describe(BackgroundMusicRepository.prototype.findOneById, () => {
    let backgroundMusicId: string;

    beforeEach(() => {
      backgroundMusicId = generateEntityId();
    });

    describe('식별자와 일치하는 리소스가 존재하는 경우', () => {
      let backgroundMusic: BackgroundMusic;

      beforeEach(async () => {
        backgroundMusic = await repository.insert(
          BackgroundMusicFactory.build({ id: backgroundMusicId }),
        );
      });

      describe('리소스를 조회하면', () => {
        it('리소스가 반환돼야한다.', async () => {
          await expect(
            repository.findOneById(backgroundMusicId),
          ).resolves.toEqual(backgroundMusic);
        });
      });
    });
  });

  describe(BackgroundMusicRepository.prototype.findAllOffsetPaginated, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let backgroundMusics: BackgroundMusic[];

    beforeEach(async () => {
      backgroundMusics = await Promise.all(
        BackgroundMusicFactory.buildList(5).map((backgroundMusic) =>
          repository.insert(backgroundMusic),
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
            (backgroundMusic: unknown) =>
              backgroundMusic instanceof BackgroundMusic,
          ),
          limit: expect.any(Number),
          offset: expect.any(Number),
          totalCount: expect.any(Number),
        });
      });
    });
  });
});
