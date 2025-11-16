import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateSoundEffectCommandProps,
  UpdateSoundEffectCommand,
} from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateSoundEffectCommandFactory = Factory.define<
  UpdateSoundEffectCommand,
  void,
  UpdateSoundEffectCommand,
  Partial<IUpdateSoundEffectCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateSoundEffectCommandProps>(
    {
      soundEffectId: generateEntityId(),
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
    },
    params,
  );

  return new UpdateSoundEffectCommand(props);
});
