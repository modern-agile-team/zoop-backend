import { Factory } from 'fishery';

import {
  DeleteQuizCommand,
  IDeleteQuizCommandProps,
} from '@module/quiz/use-cases/delete-quiz/delete-quiz.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const DeleteQuizCommandFactory = Factory.define<
  DeleteQuizCommand,
  void,
  DeleteQuizCommand,
  Partial<IDeleteQuizCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IDeleteQuizCommandProps>(
    {
      quizId: generateEntityId(),
    },
    params,
  );

  return new DeleteQuizCommand(props);
});
