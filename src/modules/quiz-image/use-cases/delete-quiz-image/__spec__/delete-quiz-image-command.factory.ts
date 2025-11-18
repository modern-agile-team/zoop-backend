import { Factory } from 'fishery';

import {
  DeleteQuizImageCommand,
  IDeleteQuizImageCommandProps,
} from '@module/quiz-image/use-cases/delete-quiz-image/delete-quiz-image.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const DeleteQuizImageCommandFactory = Factory.define<
  DeleteQuizImageCommand,
  void,
  DeleteQuizImageCommand,
  Partial<IDeleteQuizImageCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IDeleteQuizImageCommandProps>(
    {
      quizImageId: generateEntityId(),
    },
    params,
  );

  return new DeleteQuizImageCommand(props);
});
