import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateQuizImageCommand,
  ICreateQuizImageCommandProps,
} from '@module/quiz-image/use-cases/create-quiz-image/create-quiz-image.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateQuizImageCommandFactory = Factory.define<
  CreateQuizImageCommand,
  void,
  CreateQuizImageCommand,
  Partial<ICreateQuizImageCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateQuizImageCommandProps>(
    {
      category: faker.word.verb(),
      name: faker.word.verb(),
      buffer: Buffer.from(faker.string.nanoid()),
      originalFileName: faker.string.nanoid(),
      extension: faker.word.verb(),
      contentLength: faker.string.numeric(),
      contentType: faker.system.mimeType(),
      width: faker.number.int({ min: 100, max: 1000 }),
      height: faker.number.int({ min: 100, max: 1000 }),
    },
    params,
  );

  return new CreateQuizImageCommand(props);
});
