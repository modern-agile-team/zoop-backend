import { Factory } from 'fishery';

import {
  GetQuizQuery,
  IGetQuizQueryProps,
} from '@module/quiz/use-cases/get-quiz/get-quiz.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetQuizQueryFactory = Factory.define<
  GetQuizQuery,
  void,
  GetQuizQuery,
  Partial<IGetQuizQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetQuizQueryProps>(
    {
      quizId: generateEntityId(),
    },
    params,
  );

  return new GetQuizQuery(props);
});
