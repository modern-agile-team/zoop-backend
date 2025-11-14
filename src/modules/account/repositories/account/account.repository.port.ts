import { Account as AccountModel } from '@prisma/client';

import {
  Account,
  SocialProvider,
} from '@module/account/entities/account.entity';

import {
  IOffsetPaginated,
  ISort,
  RepositoryPort,
} from '@common/base/base.repository';

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');

export interface AccountRaw extends AccountModel {}

export interface AccountFilter {
  isActive?: boolean;
}

export interface AccountOrder {}

export interface FindAllAccountsOffsetPaginatedParams {
  pageInfo: {
    offset: number;
    limit: number;
  };
  order?: ISort<'createdAt'>[];
  filter?: {
    avatarFileName?: string;
  };
}

export interface AccountRepositoryPort
  extends RepositoryPort<Account, AccountFilter, AccountOrder> {
  findAllBy(options: { filter: AccountFilter }): Promise<Account[]>;
  findManyByAvatarFileNames(avatarFileName: Set<string>): Promise<Account[]>;
  findAllOffsetPaginated(
    params: FindAllAccountsOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<Account>>;
  findOneByUsername(username: string): Promise<Account | undefined>;
  findOneByNickname(nickname: string): Promise<Account | undefined>;
  findOneBySocialId(
    socialProvider: SocialProvider,
    socialProviderUid: string,
  ): Promise<Account | undefined>;
}
