import { Test, TestingModule } from '@nestjs/testing';

import { AccountFactory } from '@module/account/entities/__spec__/account.factory';
import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarInUsedError } from '@module/avatar/errors/avatar-in-used.error';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { DeleteAvatarCommandFactory } from '@module/avatar/use-cases/delete-avatar/__spec__/delete-avatar-command.factory';
import { DeleteAvatarCommand } from '@module/avatar/use-cases/delete-avatar/delete-avatar.command';
import { DeleteAvatarHandler } from '@module/avatar/use-cases/delete-avatar/delete-avatar.handler';

import { AppConfigModule } from '@common/app-config/app-config.module';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';
import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(DeleteAvatarHandler.name, () => {
  let handler: DeleteAvatarHandler;

  let avatarRepository: AvatarRepositoryPort;
  let accountRepository: AccountRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let awsS3Adapter: AwsS3Port;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: DeleteAvatarCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        AppConfigModule,
        AvatarRepositoryModule,
        AccountRepositoryModule,
        AwsS3Module,
        EventStoreModule,
      ],
      providers: [DeleteAvatarHandler],
    }).compile();

    handler = module.get<DeleteAvatarHandler>(DeleteAvatarHandler);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
    accountRepository = module.get<AccountRepositoryPort>(ACCOUNT_REPOSITORY);
    awsS3Adapter = module.get<AwsS3Port>(AWS_S3_PORT);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = DeleteAvatarCommandFactory.build();
  });

  beforeEach(() => {
    jest.spyOn(awsS3Adapter, 'deleteFile').mockResolvedValue(undefined);
  });

  describe('아바타를 삭제하면 ', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let avatar: Avatar;

    beforeEach(async () => {
      avatar = await avatarRepository.insert(
        AvatarFactory.build({ id: command.avatarId }),
      );
    });

    it('아바타가 삭제돼야한다.', async () => {
      await expect(handler.execute(command)).resolves.toBeUndefined();

      await expect(
        avatarRepository.findOneById(command.avatarId),
      ).resolves.toBeUndefined();
    });
  });

  describe('아바타가 존재하지 않는 경우', () => {
    it('아바타가 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        AvatarNotFoundError,
      );
    });
  });

  describe('아바타를 사용중인 계정이 존재하는 경우', () => {
    beforeEach(async () => {
      const avatar = await avatarRepository.insert(
        AvatarFactory.build({ id: command.avatarId }),
      );
      await accountRepository.insert(
        AccountFactory.build({ avatarFileName: avatar.fileName }),
      );
    });

    it('사용중인 아바타느 삭제할 수 없다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(
        AvatarInUsedError,
      );
    });
  });
});
