import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { Avatar, AvatarProps } from '@module/avatar/entities/avatar.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type AvatarFactoryAttributes = AvatarProps & BaseEntityProps;

export const AvatarFactory = Factory.define<
  Avatar,
  void,
  Avatar,
  Partial<AvatarFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<AvatarFactoryAttributes>(
    {
      id: generateEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      fileName: `${faker.string.nanoid()}.png`,
      originalFileName: `${faker.system.fileName()}.png`,
      name: faker.lorem.words(2),
      extension: 'png',
      contentLength: faker.number.int({ min: 1000, max: 1000000 }).toString(),
      contentType: faker.system.mimeType(),
      width: faker.number.int({ min: 100, max: 4000 }),
      height: faker.number.int({ min: 100, max: 4000 }),
      description: faker.lorem.sentence(),
      usageCount: 0,
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new Avatar({ id, createdAt, updatedAt, props });
});
