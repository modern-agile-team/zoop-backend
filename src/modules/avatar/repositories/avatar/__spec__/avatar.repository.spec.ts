import { Test, TestingModule } from '@nestjs/testing';

import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRepository } from '@module/avatar/repositories/avatar/avatar.repository';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';

import { generateEntityId } from '@common/base/base.entity';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(AvatarRepository, () => {
  let repository: AvatarRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory()],
      providers: [
        {
          provide: AVATAR_REPOSITORY,
          useClass: AvatarRepository,
        },
      ],
    }).compile();

    repository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
  });

  describe(AvatarRepository.prototype.findOneById, () => {
    let avatarId: string;

    beforeEach(() => {
      avatarId = generateEntityId();
    });

    describe('식별자와 일치하는 리소스가 존재하는 경우', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await repository.insert(AvatarFactory.build({ id: avatarId }));
      });

      describe('리소스를 조회하면', () => {
        it('리소스가 반환돼야한다.', async () => {
          await expect(repository.findOneById(avatarId)).resolves.toEqual(
            avatar,
          );
        });
      });
    });
  });

  describe(AvatarRepository.prototype.findAllOffsetPaginated, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let avatar: Avatar[];

    beforeEach(async () => {
      avatar = await Promise.all(
        AvatarFactory.buildList(5).map((avatar) => repository.insert(avatar)),
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
            (avatar: unknown) => avatar instanceof Avatar,
          ),
          limit: expect.any(Number),
          offset: expect.any(Number),
          totalCount: expect.any(Number),
        });
      });
    });
  });

  describe(AvatarRepository.prototype.findManyByAvatarFileNames, () => {
    let avatarFileNames: Set<string>;
    let avatars: Avatar[];

    beforeEach(async () => {
      avatarFileNames = new Set<string>();
      avatars = await Promise.all(
        AvatarFactory.buildList(3).map((avatar) => {
          avatarFileNames.add(avatar.fileName as string);
          return repository.insert(avatar);
        }),
      );
    });

    describe('이미지 파일명 리스트를 주면', () => {
      it('이미지 파일명에 맞는 퀴즈 목록을 반환해야 한다.', async () => {
        await expect(
          repository.findManyByAvatarFileNames(avatarFileNames),
        ).resolves.toEqual(expect.arrayContaining(avatars));
      });
    });
  });
});
