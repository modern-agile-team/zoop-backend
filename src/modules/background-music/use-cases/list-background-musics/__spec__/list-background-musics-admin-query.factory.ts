import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListBackgroundMusicsAdminQueryProps,
  ListBackgroundMusicsAdminQuery,
} from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListBackgroundMusicsAdminQueryFactory = Factory.define<
  ListBackgroundMusicsAdminQuery,
  void,
  ListBackgroundMusicsAdminQuery,
  Partial<IListBackgroundMusicsAdminQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListBackgroundMusicsAdminQueryProps>(
    {
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListBackgroundMusicsAdminQuery(props);
});
