import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateQuizCommandProps,
  UpdateQuizCommand,
} from '@module/quiz/use-cases/update-quiz/update-quiz.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateQuizCommandFactory = Factory.define<
  UpdateQuizCommand,
  void,
  UpdateQuizCommand,
  Partial<IUpdateQuizCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateQuizCommandProps>(
    {
      quizId: generateEntityId(),
      type: faker.word.noun(),
      answer: faker.word.noun(),
      question: faker.lorem.sentence(),
      imageFileName: faker.string.nanoid(),
    },
    params,
  );

  return new UpdateQuizCommand(props);
});
