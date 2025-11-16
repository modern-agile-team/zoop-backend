import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  GetAccountByUsernameQuery,
  IGetAccountByUsernameQueryProps,
} from '@module/account/use-cases/get-account-by-username/get-account-by-username.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetAccountByUsernameQueryFactory = Factory.define<
  GetAccountByUsernameQuery,
  void,
  GetAccountByUsernameQuery,
  Partial<IGetAccountByUsernameQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetAccountByUsernameQueryProps>(
    {
      username: faker.string.nanoid(10),
    },
    params,
  );

  return new GetAccountByUsernameQuery(props);
});
