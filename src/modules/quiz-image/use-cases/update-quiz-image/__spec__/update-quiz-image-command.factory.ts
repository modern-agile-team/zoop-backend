import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateQuizImageCommandProps,
  UpdateQuizImageCommand,
} from '@module/quiz-image/use-cases/update-quiz-image/update-quiz-image.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateQuizImageCommandFactory = Factory.define<
  UpdateQuizImageCommand,
  void,
  UpdateQuizImageCommand,
  Partial<IUpdateQuizImageCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateQuizImageCommandProps>(
    {
      quizImageId: generateEntityId(),
      name: faker.word.noun(),
      category: faker.word.noun(),
    },
    params,
  );

  return new UpdateQuizImageCommand(props);
});
