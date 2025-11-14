import { Test, TestingModule } from '@nestjs/testing';

import { AccountFactory } from '@module/account/entities/__spec__/account.factory';
import { Account } from '@module/account/entities/account.entity';
import { AccountAvatarNotFoundError } from '@module/account/errors/account-avatar-not-found.error';
import { AccountNicknameAlreadyOccupiedError } from '@module/account/errors/account-nickname-already-occupied.error';
import { AccountNotFoundError } from '@module/account/errors/account-not-found.error';
import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { UpdateAccountCommandFactory } from '@module/account/use-cases/update-account/__spec__/update-account-command.factory';
import { UpdateAccountCommand } from '@module/account/use-cases/update-account/update-account.command';
import { UpdateAccountHandler } from '@module/account/use-cases/update-account/update-account.handler';
import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';

import { generateEntityId } from '@common/base/base.entity';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(UpdateAccountHandler.name, () => {
  let handler: UpdateAccountHandler;

  let accountRepository: AccountRepositoryPort;
  let avatarRepository: AvatarRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: UpdateAccountCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        AccountRepositoryModule,
        AvatarRepositoryModule,
        EventStoreModule,
      ],
      providers: [UpdateAccountHandler],
    }).compile();

    handler = module.get<UpdateAccountHandler>(UpdateAccountHandler);

    accountRepository = module.get<AccountRepositoryPort>(ACCOUNT_REPOSITORY);
    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = UpdateAccountCommandFactory.build();
  });

  let account: Account;
  beforeEach(async () => {
    account = await accountRepository.insert(
      AccountFactory.build({ id: command.accountId }),
    );
  });

  describe('계정을 수정하면', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let avatar: Avatar;

    beforeEach(async () => {
      avatar = await avatarRepository.insert(
        AvatarFactory.build({
          fileName: command.avatarFileName,
        }),
      );
    });

    it('계정이 수정되어야한다.', async () => {
      await expect(handler.execute(command)).resolves.toEqual(
        expect.objectContaining({
          id: account.id,
          nickname: command.nickname,
          avatarFileName: command.avatarFileName,
        }),
      );
    });
  });

  describe('계정이 존재하지 않는 경우', () => {
    it('계정이 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(
        handler.execute({ ...command, accountId: generateEntityId() }),
      ).rejects.toThrow(AccountNotFoundError);
    });
  });

  describe('이미 사용중인 닉네임으로 변경하려는 경우', () => {
    beforeEach(async () => {
      await accountRepository.insert(
        AccountFactory.build({
          nickname: command.nickname,
        }),
      );
    });

    it('해당 닉네임은 이미 사용중이라는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        AccountNicknameAlreadyOccupiedError,
      );
    });
  });

  describe('아바타가 존재하지 않는 경우', () => {
    it('아바타가 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        AccountAvatarNotFoundError,
      );
    });
  });
});
