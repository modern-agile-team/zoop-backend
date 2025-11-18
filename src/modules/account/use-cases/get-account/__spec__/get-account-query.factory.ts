import { Factory } from 'fishery';

import {
  GetAccountQuery,
  IGetAccountQueryProps,
} from '@module/account/use-cases/get-account/get-account.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetAccountQueryFactory = Factory.define<
  GetAccountQuery,
  void,
  GetAccountQuery,
  Partial<IGetAccountQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetAccountQueryProps>(
    {
      accountId: generateEntityId(),
    },
    params,
  );

  return new GetAccountQuery(props);
});
