import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import {
  SoundEffect,
  SoundEffectProps,
} from '@module/sound-effect/entities/sound-effect.entity';

import { generateEntityId } from '@common/base/base.entity';

export const SoundEffectFactory = Factory.define<
  SoundEffect & SoundEffectProps
>(SoundEffect.name)
  .attrs({
    id: () => generateEntityId(),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
    fileName: () => `${faker.string.nanoid()}.mp4`,
    originalFileName: () => `${faker.system.fileName()}.mp4`,
    name: () => faker.lorem.words(2),
    extension: () => 'mp4',
    contentLength: () =>
      faker.number.int({ min: 1000, max: 1000000 }).toString(),
    contentType: () => faker.system.mimeType(),
    description: () => faker.lorem.sentence(),
  })
  .after(
    ({ id, createdAt, updatedAt, ...props }) =>
      new SoundEffect({ id, createdAt, updatedAt, props }),
  );
