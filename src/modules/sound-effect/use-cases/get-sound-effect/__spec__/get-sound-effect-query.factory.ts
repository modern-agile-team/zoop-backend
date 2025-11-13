import { Factory } from 'rosie';

import { GetSoundEffectQuery } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.query';

import { generateEntityId } from '@common/base/base.entity';

export const GetSoundEffectQueryFactory = Factory.define<GetSoundEffectQuery>(
  GetSoundEffectQuery.name,
  GetSoundEffectQuery,
).attrs({
  soundEffectId: () => generateEntityId(),
});
