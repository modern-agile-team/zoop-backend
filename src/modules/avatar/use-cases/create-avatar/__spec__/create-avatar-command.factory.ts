import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { CreateAvatarCommand } from '@module/avatar/use-cases/create-avatar/create-avatar.command';

export const CreateAvatarCommandFactory = Factory.define<CreateAvatarCommand>(
  CreateAvatarCommand.name,
  CreateAvatarCommand,
).attrs({
  name: () => faker.lorem.words(2),
  description: () => faker.lorem.sentence(),
  buffer: () => Buffer.from(faker.string.nanoid()),
  originalFileName: () => `${faker.lorem.words(2).replace(/\s+/g, '_')}.png`,
  extension: () => 'png',
  contentLength: () => faker.number.int({ min: 1000, max: 100000 }).toString(),
  contentType: () => faker.system.mimeType(),
  width: () => faker.number.int({ min: 100, max: 1000 }),
  height: () => faker.number.int({ min: 100, max: 1000 }),
});
