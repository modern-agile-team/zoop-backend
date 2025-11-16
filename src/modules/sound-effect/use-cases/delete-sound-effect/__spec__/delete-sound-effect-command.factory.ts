import { Factory } from 'fishery';

import {
  DeleteSoundEffectCommand,
  IDeleteSoundEffectCommandProps,
} from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const DeleteSoundEffectCommandFactory = Factory.define<
  DeleteSoundEffectCommand,
  void,
  DeleteSoundEffectCommand,
  Partial<IDeleteSoundEffectCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IDeleteSoundEffectCommandProps>(
    {
      soundEffectId: generateEntityId(),
    },
    params,
  );

  return new DeleteSoundEffectCommand(props);
});
