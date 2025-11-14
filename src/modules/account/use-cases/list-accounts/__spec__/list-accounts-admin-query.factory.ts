import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { ListAccountsAdminQuery } from '@module/account/use-cases/list-accounts/list-accounts.admin-query';

export const ListAccountsAdminQueryFactory =
  Factory.define<ListAccountsAdminQuery>(
    ListAccountsAdminQuery.name,
    ListAccountsAdminQuery,
  ).attrs({
    avatarFileName: () => faker.string.nanoid(),
    page: () => 1,
    perPage: () => 20,
  });
