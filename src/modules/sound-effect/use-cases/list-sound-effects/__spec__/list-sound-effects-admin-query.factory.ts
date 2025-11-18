import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { ListSoundEffectsAdminQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects-admin.query';
import { IListSoundEffectsQueryProps } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListSoundEffectsAdminQueryFactory = Factory.define<
  ListSoundEffectsAdminQuery,
  void,
  ListSoundEffectsAdminQuery,
  Partial<IListSoundEffectsQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListSoundEffectsQueryProps>(
    {
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListSoundEffectsAdminQuery(props);
});
