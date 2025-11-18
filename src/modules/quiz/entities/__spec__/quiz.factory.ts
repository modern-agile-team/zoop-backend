import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { Quiz, QuizProps } from '@module/quiz/entities/quiz.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type QuizFactoryAttributes = QuizProps & BaseEntityProps;

export const QuizFactory = Factory.define<
  Quiz,
  void,
  Quiz,
  Partial<QuizFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<QuizFactoryAttributes>(
    {
      id: generateEntityId(),
      type: faker.string.nanoid(),
      question: faker.lorem.sentence(),
      answer: faker.lorem.word(),
      imageFileName: faker.string.nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new Quiz({ id, createdAt, updatedAt, props });
});
