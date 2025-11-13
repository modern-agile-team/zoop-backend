import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { ListSoundEffectsQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

export const ListSoundEffectsQueryFactory =
  Factory.define<ListSoundEffectsQuery>(
    ListSoundEffectsQuery.name,
    ListSoundEffectsQuery,
  ).attrs({
    page: () => faker.number.int({ min: 1, max: 10 }),
    perPage: () => faker.number.int({ min: 1, max: 50 }),
  });
