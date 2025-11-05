import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { CreateSoundEffectCommand } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.command';

export const CreateSoundEffectCommandFactory =
  Factory.define<CreateSoundEffectCommand>(
    CreateSoundEffectCommand.name,
    CreateSoundEffectCommand,
  ).attrs({
    name: () => faker.lorem.words(2),
    description: () => faker.lorem.sentence(),
    buffer: () => Buffer.from(faker.string.nanoid()),
    originalFileName: () => `${faker.lorem.words(2).replace(/\s+/g, '_')}.png`,
    extension: () => 'png',
    contentLength: () =>
      faker.number.int({ min: 1000, max: 100000 }).toString(),
    contentType: () => faker.system.mimeType(),
  });
