import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateSoundEffectCommand,
  ICreateSoundEffectCommandProps,
} from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateSoundEffectCommandFactory = Factory.define<
  CreateSoundEffectCommand,
  void,
  CreateSoundEffectCommand,
  Partial<ICreateSoundEffectCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateSoundEffectCommandProps>(
    {
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      buffer: Buffer.from(faker.string.nanoid()),
      originalFileName: `${faker.lorem.words(2).replace(/\s+/g, '_')}.png`,
      extension: 'png',
      contentLength: faker.number.int({ min: 1000, max: 100000 }).toString(),
      contentType: faker.system.mimeType(),
    },
    params,
  );

  return new CreateSoundEffectCommand(props);
});
