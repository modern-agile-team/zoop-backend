import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateBackgroundMusicCommand,
  ICreateBackgroundMusicCommandProps,
} from '@module/background-music/use-cases/create-background-music/create-background-music.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateBackgroundMusicCommandFactory = Factory.define<
  CreateBackgroundMusicCommand,
  void,
  CreateBackgroundMusicCommand,
  Partial<ICreateBackgroundMusicCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateBackgroundMusicCommandProps>(
    {
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      buffer: Buffer.from(faker.string.nanoid()),
      originalFileName: `${faker.system.fileName()}.mp3`,
      durationInSeconds: faker.number.int({ min: 1, max: 1000 }),
      extension: 'mp3',
      contentLength: faker.number.int({ min: 1000, max: 100000 }).toString(),
      contentType: faker.system.mimeType(),
    },
    params,
  );

  return new CreateBackgroundMusicCommand(props);
});
