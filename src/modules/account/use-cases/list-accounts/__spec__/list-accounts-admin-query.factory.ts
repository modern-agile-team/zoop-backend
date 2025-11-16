import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListAccountsAdminQueryProps,
  ListAccountsAdminQuery,
} from '@module/account/use-cases/list-accounts/list-accounts.admin-query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListAccountsAdminQueryFactory = Factory.define<
  ListAccountsAdminQuery,
  void,
  ListAccountsAdminQuery,
  Partial<IListAccountsAdminQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListAccountsAdminQueryProps>(
    {
      avatarFileName: faker.string.nanoid(),
      page: 1,
      perPage: 20,
    },
    params,
  );

  return new ListAccountsAdminQuery(props);
});
