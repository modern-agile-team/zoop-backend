import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Account } from '@module/account/entities/account.entity';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { ListAccountsAdminQuery } from '@module/account/use-cases/list-accounts/list-accounts.admin-query';

import { OffsetPage } from '@common/base/base.entity';

@QueryHandler(ListAccountsAdminQuery)
export class ListAccountsAdminHandler
  implements IQueryHandler<ListAccountsAdminQuery, OffsetPage<Account>>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(query: ListAccountsAdminQuery): Promise<OffsetPage<Account>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const result = await this.accountRepository.findAllOffsetPaginated({
      pageInfo: {
        offset: (page - 1) * perPage,
        limit: perPage,
      },
      filter: {
        avatarFileName: query.avatarFileName,
      },
    });

    return new OffsetPage(result.data, page, perPage, result.totalCount);
  }
}
