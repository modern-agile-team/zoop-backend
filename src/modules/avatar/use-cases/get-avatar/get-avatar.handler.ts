import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { GetAvatarQuery } from '@module/avatar/use-cases/get-avatar/get-avatar.query';

@QueryHandler(GetAvatarQuery)
export class GetAvatarHandler implements IQueryHandler<GetAvatarQuery, Avatar> {
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
  ) {}

  async execute(query: GetAvatarQuery): Promise<Avatar> {
    const avatar = await this.avatarRepository.findOneById(query.avatarId);

    if (avatar === undefined) {
      throw new AvatarNotFoundError();
    }

    return avatar;
  }
}
