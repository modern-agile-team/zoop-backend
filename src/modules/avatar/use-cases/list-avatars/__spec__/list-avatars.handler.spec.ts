import { Test, TestingModule } from '@nestjs/testing';

import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { ListAvatarsQueryFactory } from '@module/avatar/use-cases/list-avatars/__spec__/list-avatars-query.factory';
import { ListAvatarsHandler } from '@module/avatar/use-cases/list-avatars/list-avatars.handler';
import { ListAvatarsQuery } from '@module/avatar/use-cases/list-avatars/list-avatars.query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(ListAvatarsHandler.name, () => {
  let handler: ListAvatarsHandler;

  let avatarRepository: AvatarRepositoryPort;

  let query: ListAvatarsQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), AvatarRepositoryModule],
      providers: [ListAvatarsHandler],
    }).compile();

    handler = module.get<ListAvatarsHandler>(ListAvatarsHandler);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
  });

  beforeEach(() => {
    query = ListAvatarsQueryFactory.build();
  });

  describe('아바타 페이지를 조회하면', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let avatars: Avatar[];

    beforeEach(async () => {
      avatars = await Promise.all(
        AvatarFactory.buildList(5).map((avatar) =>
          avatarRepository.insert(avatar),
        ),
      );
    });

    it('아바타 페이지가 반환되어야하는다.', async () => {
      const result = await handler.execute(query);

      expect(result).toBeDefined();
      expect(result.data.length).toBeGreaterThanOrEqual(0);
      expect(result.currentPage).toBe(query.page ?? 1);
      expect(result.perPage).toBe(query.perPage ?? 20);
      expect(result.totalCount).toBeGreaterThanOrEqual(0);
    });
  });
});
