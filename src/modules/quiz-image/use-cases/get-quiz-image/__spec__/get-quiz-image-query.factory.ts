import { Factory } from 'fishery';

import {
  GetQuizImageQuery,
  IGetQuizImageQueryProps,
} from '@module/quiz-image/use-cases/get-quiz-image/get-quiz-image.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetQuizImageQueryFactory = Factory.define<
  GetQuizImageQuery,
  void,
  GetQuizImageQuery,
  Partial<IGetQuizImageQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetQuizImageQueryProps>(
    {
      quizImageId: generateEntityId(),
    },
    params,
  );

  return new GetQuizImageQuery(props);
});
