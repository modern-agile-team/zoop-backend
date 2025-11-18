import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListSoundEffectsQueryProps,
  ListSoundEffectsQuery,
} from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListSoundEffectsQueryFactory = Factory.define<
  ListSoundEffectsQuery,
  void,
  ListSoundEffectsQuery,
  Partial<IListSoundEffectsQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListSoundEffectsQueryProps>(
    {
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListSoundEffectsQuery(props);
});
