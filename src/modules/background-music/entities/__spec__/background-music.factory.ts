import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  BackgroundMusic,
  BackgroundMusicProps,
} from '@module/background-music/entities/background-music.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type BackgroundMusicFactoryAttributes = BackgroundMusicProps & BaseEntityProps;

export const BackgroundMusicFactory = Factory.define<
  BackgroundMusic,
  void,
  BackgroundMusic,
  Partial<BackgroundMusicFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<BackgroundMusicFactoryAttributes>(
    {
      id: generateEntityId(),

      createdAt: new Date(),
      updatedAt: new Date(),
      fileName: `${faker.string.nanoid()}.mp3`,
      originalFileName: `${faker.system.fileName()}.mp3`,
      durationInSeconds: faker.number.int({ min: 1, max: 1000 }),
      name: faker.lorem.words(2),
      extension: 'mp3',
      contentLength: faker.number.int({ min: 1000, max: 1000000 }).toString(),
      contentType: faker.system.mimeType(),
      description: faker.lorem.sentence(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new BackgroundMusic({ id, createdAt, updatedAt, props });
});
