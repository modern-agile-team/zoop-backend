import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { ListAvatarsQuery } from '@module/avatar/use-cases/list-avatars/list-avatars.query';

export const ListAvatarsQueryFactory = Factory.define<ListAvatarsQuery>(
  ListAvatarsQuery.name,
  ListAvatarsQuery,
).attrs({
  page: () => faker.number.int({ min: 1, max: 10 }),
  perPage: () => faker.number.int({ min: 1, max: 50 }),
});
