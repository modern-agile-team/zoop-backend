import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { ListSoundEffectsAdminQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects-admin.query';

export const ListSoundEffectsAdminQueryFactory =
  Factory.define<ListSoundEffectsAdminQuery>(
    ListSoundEffectsAdminQuery.name,
    ListSoundEffectsAdminQuery,
  ).attrs({
    page: () => faker.number.int({ min: 1, max: 10 }),
    perPage: () => faker.number.int({ min: 1, max: 50 }),
  });
