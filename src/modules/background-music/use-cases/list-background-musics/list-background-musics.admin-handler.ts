import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import {
  BACKGROUND_MUSIC_REPOSITORY,
  BackgroundMusicRepositoryPort,
} from '@module/background-music/repositories/background-music/background-music.repository.port';
import { ListBackgroundMusicsAdminQuery } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-query';

import { OffsetPage } from '@common/base/base.entity';

@QueryHandler(ListBackgroundMusicsAdminQuery)
export class ListBackgroundMusicsAdminHandler
  implements
    IQueryHandler<ListBackgroundMusicsAdminQuery, OffsetPage<BackgroundMusic>>
{
  constructor(
    @Inject(BACKGROUND_MUSIC_REPOSITORY)
    private readonly backgroundMusicRepository: BackgroundMusicRepositoryPort,
  ) {}

  async execute(
    query: ListBackgroundMusicsAdminQuery,
  ): Promise<OffsetPage<BackgroundMusic>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const result = await this.backgroundMusicRepository.findAllOffsetPaginated({
      pageInfo: {
        offset: (page - 1) * perPage,
        limit: perPage,
      },
    });

    return new OffsetPage(result.data, page, perPage, result.totalCount);
  }
}
