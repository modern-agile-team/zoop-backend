import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { ListAvatarsQuery } from '@module/avatar/use-cases/list-avatars/list-avatars.query';

import { OffsetPage } from '@common/base/base.entity';

@QueryHandler(ListAvatarsQuery)
export class ListAvatarsHandler
  implements IQueryHandler<ListAvatarsQuery, OffsetPage<Avatar>>
{
  constructor(
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
  ) {}

  async execute(query: ListAvatarsQuery): Promise<OffsetPage<Avatar>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const result = await this.avatarRepository.findAllOffsetPaginated({
      pageInfo: {
        offset: (page - 1) * perPage,
        limit: perPage,
      },
    });

    return new OffsetPage(result.data, page, perPage, result.totalCount);
  }
}
