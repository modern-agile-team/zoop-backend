import { Test, TestingModule } from '@nestjs/testing';

import { AccountFactory } from '@module/account/entities/__spec__/account.factory';
import { Account } from '@module/account/entities/account.entity';
import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { ListAccountsAdminQueryFactory } from '@module/account/use-cases/list-accounts/__spec__/list-accounts-admin-query.factory';
import { ListAccountsAdminHandler } from '@module/account/use-cases/list-accounts/list-accounts.admin-handler';
import { ListAccountsAdminQuery } from '@module/account/use-cases/list-accounts/list-accounts.admin-query';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

describe(ListAccountsAdminHandler.name, () => {
  let handler: ListAccountsAdminHandler;

  let accountRepository: AccountRepositoryPort;

  let query: ListAccountsAdminQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModuleFactory(), AccountRepositoryModule],
      providers: [ListAccountsAdminHandler],
    }).compile();

    handler = module.get<ListAccountsAdminHandler>(ListAccountsAdminHandler);

    accountRepository = module.get<AccountRepositoryPort>(ACCOUNT_REPOSITORY);
  });

  beforeEach(() => {
    query = ListAccountsAdminQueryFactory.build();
  });

  beforeEach(async () => {
    await Promise.all(
      AccountFactory.buildList(3, {
        avatarFileName: query.avatarFileName,
      }).map((account) => accountRepository.insert(account)),
    );
  });
  describe('모든 계정 목록을 조회하면', () => {
    it('계정 목록이 조회돼야한다.', async () => {
      const result = await handler.execute({
        page: query.page,
        perPage: query.perPage,
      });

      expect(result).toBeDefined();
      expect(result.data.length).toBeGreaterThanOrEqual(3);
      expect(result.currentPage).toBe(query.page ?? 1);
      expect(result.perPage).toBe(query.perPage ?? 20);
      expect(result.totalCount).toBeGreaterThanOrEqual(3);
    });
  });

  describe('아바타로 필터링된 계정 목록을 조회하면', () => {
    it('아바타로 필터링된 계정 목록이 조회돼야한다.', async () => {
      const result = await handler.execute(query);

      expect(result).toBeDefined();
      expect(result.data.length).toBeGreaterThanOrEqual(3);
      expect(result.data).toSatisfyAll<Account>(
        (account) => account.avatarFileName === query.avatarFileName,
      );
      expect(result.currentPage).toBe(query.page ?? 1);
      expect(result.perPage).toBe(query.perPage ?? 20);
      expect(result.totalCount).toBeGreaterThanOrEqual(3);
    });
  });
});
