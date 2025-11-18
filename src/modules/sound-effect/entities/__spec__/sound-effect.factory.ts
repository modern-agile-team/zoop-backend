import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  SoundEffect,
  SoundEffectProps,
} from '@module/sound-effect/entities/sound-effect.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type SoundEffectFactoryAttributes = SoundEffectProps & BaseEntityProps;

export const SoundEffectFactory = Factory.define<
  SoundEffect,
  void,
  SoundEffect,
  Partial<SoundEffectFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<SoundEffectFactoryAttributes>(
    {
      id: generateEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      fileName: `${faker.string.nanoid()}.mp4`,
      originalFileName: `${faker.system.fileName()}.mp4`,
      name: faker.lorem.words(2),
      extension: 'mp4',
      contentLength: faker.number.int({ min: 1000, max: 1000000 }).toString(),
      contentType: faker.system.mimeType(),
      description: faker.lorem.sentence(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new SoundEffect({ id, createdAt, updatedAt, props });
});
