import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { SocialProvider } from '@module/account/entities/account.entity';
import {
  GetAccountBySocialIdQuery,
  IGetAccountBySocialIdQueryProps,
} from '@module/account/use-cases/get-account-by-social-id/get-account-by-social-id.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetAccountBySocialIdQueryFactory = Factory.define<
  GetAccountBySocialIdQuery,
  void,
  GetAccountBySocialIdQuery,
  Partial<IGetAccountBySocialIdQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetAccountBySocialIdQueryProps>(
    {
      provider: faker.helpers.enumValue(SocialProvider),
      providerUid: faker.string.nanoid(),
    },
    params,
  );

  return new GetAccountBySocialIdQuery(props);
});
