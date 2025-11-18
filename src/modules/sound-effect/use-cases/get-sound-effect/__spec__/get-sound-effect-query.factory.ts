import { Factory } from 'fishery';

import {
  GetSoundEffectQuery,
  IGetSoundEffectQueryProps,
} from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetSoundEffectQueryFactory = Factory.define<
  GetSoundEffectQuery,
  void,
  GetSoundEffectQuery,
  Partial<IGetSoundEffectQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetSoundEffectQueryProps>(
    {
      soundEffectId: generateEntityId(),
    },
    params,
  );

  return new GetSoundEffectQuery(props);
});
