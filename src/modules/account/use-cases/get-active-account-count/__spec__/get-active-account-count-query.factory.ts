import { Factory } from 'fishery';

import {
  GetActiveAccountCountQuery,
  IGetActiveAccountCountQueryProps,
} from '@module/account/use-cases/get-active-account-count/get-active-account-count.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetActiveAccountCountQueryFactory = Factory.define<
  GetActiveAccountCountQuery,
  void,
  GetActiveAccountCountQuery,
  Partial<IGetActiveAccountCountQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetActiveAccountCountQueryProps>(
    {},
    params,
  );

  return new GetActiveAccountCountQuery(props);
});
