import { BackgroundMusic as BackgroundMusicModel } from '@prisma/client';

import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';

import { IOffsetPaginated, RepositoryPort } from '@common/base/base.repository';

export const BACKGROUND_MUSIC_REPOSITORY = Symbol(
  'BACKGROUND_MUSIC_REPOSITORY',
);

export interface BackgroundMusicRaw extends BackgroundMusicModel {}

export interface BackgroundMusicFilter {}

export interface BackgroundMusicOrder {}

export interface FindAllBackgroundMusicsOffsetPaginatedParams {
  pageInfo: {
    offset: number;
    limit: number;
  };
}

export interface BackgroundMusicRepositoryPort
  extends RepositoryPort<
    BackgroundMusic,
    BackgroundMusicFilter,
    BackgroundMusicOrder
  > {
  findAllOffsetPaginated(
    params: FindAllBackgroundMusicsOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<BackgroundMusic>>;
}
