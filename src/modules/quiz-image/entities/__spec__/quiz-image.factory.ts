import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  QuizImage,
  QuizImageProps,
} from '@module/quiz-image/entities/quiz-image.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type QuizImageFactoryAttributes = QuizImageProps & BaseEntityProps;

export const QuizImageFactory = Factory.define<
  QuizImage,
  void,
  QuizImage,
  Partial<QuizImageFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<QuizImageFactoryAttributes>(
    {
      id: generateEntityId(),
      category: faker.word.verb(),
      name: faker.string.nanoid(),
      originalFileName: faker.string.nanoid(),
      fileName: faker.string.nanoid(),
      extension: faker.word.verb(),
      contentLength: faker.string.numeric(),
      contentType: faker.system.mimeType(),
      width: faker.number.int({ min: 100, max: 1000 }),
      height: faker.number.int({ min: 100, max: 1000 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new QuizImage({ id, createdAt, updatedAt, props });
});
