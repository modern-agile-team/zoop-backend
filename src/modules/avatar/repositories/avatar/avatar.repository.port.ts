import { Avatar as AvatarModel } from '@prisma/client';

import { Avatar } from '@module/avatar/entities/avatar.entity';

import {
  IOffsetPaginated,
  ISort,
  RepositoryPort,
} from '@common/base/base.repository';

export const AVATAR_REPOSITORY = Symbol('AVATAR_REPOSITORY');

export interface AvatarRaw extends AvatarModel {}

export interface AvatarFilter {}

export interface AvatarOrder {}

export interface FindAllAvatarsOffsetPaginatedParams {
  pageInfo: {
    offset: number;
    limit: number;
  };
  order?: ISort<'createdAt' | 'usageCount'>[];
}

export interface AvatarRepositoryPort
  extends RepositoryPort<Avatar, AvatarFilter, AvatarOrder> {
  findAllOffsetPaginated(
    params: FindAllAvatarsOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<Avatar>>;
  findManyByAvatarFileNames(avatarFileNames: Set<string>): Promise<Avatar[]>;
}
