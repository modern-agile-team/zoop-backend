import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { Avatar, AvatarProps } from '@module/avatar/entities/avatar.entity';

import { generateEntityId } from '@common/base/base.entity';

export const AvatarFactory = Factory.define<Avatar & AvatarProps>(Avatar.name)
  .attrs({
    id: () => generateEntityId(),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
    fileName: () => `${faker.string.nanoid()}.png`,
    originalFileName: () => `${faker.system.fileName()}.png`,
    name: () => faker.lorem.words(2),
    extension: () => 'png',
    contentLength: () =>
      faker.number.int({ min: 1000, max: 1000000 }).toString(),
    contentType: () => faker.system.mimeType(),
    width: () => faker.number.int({ min: 100, max: 4000 }),
    height: () => faker.number.int({ min: 100, max: 4000 }),
    description: () => faker.lorem.sentence(),
    usageCount: () => 0,
  })
  .after(
    ({ id, createdAt, updatedAt, ...props }) =>
      new Avatar({ id, createdAt, updatedAt, props }),
  );
