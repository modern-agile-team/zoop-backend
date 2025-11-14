import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Account } from '@module/account/entities/account.entity';
import { AccountAvatarNotFoundError } from '@module/account/errors/account-avatar-not-found.error';
import { AccountNicknameAlreadyOccupiedError } from '@module/account/errors/account-nickname-already-occupied.error';
import { AccountNotFoundError } from '@module/account/errors/account-not-found.error';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { UpdateAccountCommand } from '@module/account/use-cases/update-account/update-account.command';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand, Account>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryPort,
    @Inject(AVATAR_REPOSITORY)
    private readonly avatarRepository: AvatarRepositoryPort,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  async execute(command: UpdateAccountCommand): Promise<Account> {
    const account = await this.accountRepository.findOneById(command.accountId);

    if (account === undefined) {
      throw new AccountNotFoundError();
    }

    await Promise.all([
      this.validateNickname(account, command.nickname),
      this.validateAvatar(account, command.avatarFileName),
    ]);

    account.update({
      nickname: command.nickname,
      avatarFileName: command.avatarFileName,
    });

    await this.accountRepository.update(account);

    await this.eventStore.storeAggregateEvents(account);

    return account;
  }

  async validateNickname(account: Account, nickname?: string): Promise<void> {
    if (nickname !== undefined && nickname !== account.nickname) {
      const accountByNickname =
        await this.accountRepository.findOneByNickname(nickname);

      if (accountByNickname !== undefined) {
        throw new AccountNicknameAlreadyOccupiedError();
      }
    }
  }

  async validateAvatar(
    account: Account,
    avatarFileName?: string,
  ): Promise<void> {
    if (
      avatarFileName !== undefined &&
      avatarFileName !== account.avatarFileName
    ) {
      const avatar = await this.avatarRepository.findManyByAvatarFileNames(
        new Set([avatarFileName]),
      );

      if (avatar.length === 0) {
        throw new AccountAvatarNotFoundError();
      }
    }
  }
}
