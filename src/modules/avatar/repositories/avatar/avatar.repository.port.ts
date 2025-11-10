import { Avatar as AvatarModel } from '@prisma/client';

import { Avatar } from '@module/avatar/entities/avatar.entity';

import { RepositoryPort } from '@common/base/base.repository';

export const AVATAR_REPOSITORY = Symbol('AVATAR_REPOSITORY');

export interface AvatarRaw extends AvatarModel {}

export interface AvatarFilter {}

export interface AvatarOrder {}

export interface AvatarRepositoryPort
  extends RepositoryPort<Avatar, AvatarFilter, AvatarOrder> {}
