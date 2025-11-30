import { Test, TestingModule } from '@nestjs/testing';

import { BackgroundMusicFactory } from '@module/background-music/entities/__spec__/background-music.factory';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { BackgroundMusicRepositoryModule } from '@module/background-music/repositories/background-music/background-music.repository.module';
import {
  BACKGROUND_MUSIC_REPOSITORY,
  BackgroundMusicRepositoryPort,
} from '@module/background-music/repositories/background-music/background-music.repository.port';
import { ListBackgroundMusicsAdminQueryFactory } from '@module/background-music/use-cases/list-background-musics/__spec__/list-background-musics-admin-query.factory';
import { ListBackgroundMusicsAdminHandler } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-handler';
import { ListBackgroundMusicsAdminQuery } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(ListBackgroundMusicsAdminHandler.name, () => {
  let handler: ListBackgroundMusicsAdminHandler;

  let backgroundMusicRepository: BackgroundMusicRepositoryPort;

  let query: ListBackgroundMusicsAdminQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), BackgroundMusicRepositoryModule],
      providers: [ListBackgroundMusicsAdminHandler],
    }).compile();

    handler = module.get<ListBackgroundMusicsAdminHandler>(
      ListBackgroundMusicsAdminHandler,
    );

    backgroundMusicRepository = module.get<BackgroundMusicRepositoryPort>(
      BACKGROUND_MUSIC_REPOSITORY,
    );
  });

  beforeEach(() => {
    query = ListBackgroundMusicsAdminQueryFactory.build({
      page: 1,
      perPage: 20,
    });
  });

  describe('배경음악 페이지를 조회하면', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let backgroundMusics: BackgroundMusic[];

    beforeEach(async () => {
      backgroundMusics = await Promise.all(
        BackgroundMusicFactory.buildList(5).map((backgroundMusic) =>
          backgroundMusicRepository.insert(backgroundMusic),
        ),
      );
    });

    it('배경음악 페이지가 반환돼야한다.', async () => {
      const result = await handler.execute(query);

      expect(result).toBeDefined();
      expect(result.data.length).toBeGreaterThanOrEqual(5);
      expect(result.currentPage).toBe(query.page ?? 1);
      expect(result.perPage).toBe(query.perPage ?? 20);
      expect(result.totalCount).toBeGreaterThanOrEqual(5);
    });
  });
});
