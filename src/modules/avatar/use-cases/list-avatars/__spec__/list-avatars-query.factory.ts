import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListAvatarsQueryProps,
  ListAvatarsQuery,
} from '@module/avatar/use-cases/list-avatars/list-avatars.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListAvatarsQueryFactory = Factory.define<
  ListAvatarsQuery,
  void,
  ListAvatarsQuery,
  Partial<IListAvatarsQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListAvatarsQueryProps>(
    {
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListAvatarsQuery(props);
});
