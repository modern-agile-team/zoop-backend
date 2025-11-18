import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListAccountsQueryProps,
  ListAccountsQuery,
} from '@module/account/use-cases/list-accounts/list-accounts.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListAccountsQueryFactory = Factory.define<
  ListAccountsQuery,
  void,
  ListAccountsQuery,
  Partial<IListAccountsQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListAccountsQueryProps>(
    {
      isActive: faker.datatype.boolean(),
    },
    params,
  );

  return new ListAccountsQuery(props);
});
