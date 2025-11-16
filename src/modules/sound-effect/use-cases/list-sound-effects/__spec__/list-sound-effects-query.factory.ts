import { Factory } from 'rosie';

import { ListSoundEffectsQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

export const ListSoundEffectsQueryFactory =
  Factory.define<ListSoundEffectsQuery>(
    ListSoundEffectsQuery.name,
    ListSoundEffectsQuery,
  ).attrs({});
