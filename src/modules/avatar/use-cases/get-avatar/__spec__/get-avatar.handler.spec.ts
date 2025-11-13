import { Test, TestingModule } from '@nestjs/testing';

import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { GetAvatarQueryFactory } from '@module/avatar/use-cases/get-avatar/__spec__/get-avatar-query.factory';
import { GetAvatarHandler } from '@module/avatar/use-cases/get-avatar/get-avatar.handler';
import { GetAvatarQuery } from '@module/avatar/use-cases/get-avatar/get-avatar.query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(GetAvatarHandler.name, () => {
  let handler: GetAvatarHandler;

  let avatarRepository: AvatarRepositoryPort;

  let query: GetAvatarQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), AvatarRepositoryModule],
      providers: [GetAvatarHandler],
    }).compile();

    handler = module.get<GetAvatarHandler>(GetAvatarHandler);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
  });

  beforeEach(() => {
    query = GetAvatarQueryFactory.build();
  });

  describe('아바타를 조회하면', () => {
    let avatar: Avatar;

    beforeEach(async () => {
      avatar = await avatarRepository.insert(
        AvatarFactory.build({ id: query.avatarId }),
      );
    });

    it('아바타를 반환해야한다.', async () => {
      await expect(handler.execute(query)).resolves.toEqual(avatar);
    });
  });

  describe('식별자에 해당하는 아바타가 존재하지 않는 경우', () => {
    it('아바타를 찾을 수 없는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(query)).rejects.toThrow(AvatarNotFoundError);
    });
  });
});
