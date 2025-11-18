import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListNicknameSourcesQueryProps,
  ListNicknameSourcesQuery,
} from '@module/nickname-source/use-cases/list-nickname-sources/list-nickname-sources.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListNicknameSourcesQueryFactory = Factory.define<
  ListNicknameSourcesQuery,
  void,
  ListNicknameSourcesQuery,
  Partial<IListNicknameSourcesQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListNicknameSourcesQueryProps>(
    {
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListNicknameSourcesQuery(props);
});
