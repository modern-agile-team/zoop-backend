import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateAvatarCommand,
  ICreateAvatarCommandProps,
} from '@module/avatar/use-cases/create-avatar/create-avatar.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateAvatarCommandFactory = Factory.define<
  CreateAvatarCommand,
  void,
  CreateAvatarCommand,
  Partial<ICreateAvatarCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateAvatarCommandProps>(
    {
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      buffer: Buffer.from(faker.string.nanoid()),
      originalFileName: `${faker.lorem.words(2).replace(/\s+/g, '_')}.png`,
      extension: 'png',
      contentLength: faker.number.int({ min: 1000, max: 100000 }).toString(),
      contentType: faker.system.mimeType(),
      width: faker.number.int({ min: 100, max: 1000 }),
      height: faker.number.int({ min: 100, max: 1000 }),
    },
    params,
  );

  return new CreateAvatarCommand(props);
});
