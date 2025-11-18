import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListQuizzesQueryProps,
  ListQuizzesQuery,
} from '@module/quiz/use-cases/list-quizzes/list-quizzes.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListQuizzesQueryFactory = Factory.define<
  ListQuizzesQuery,
  void,
  ListQuizzesQuery,
  Partial<IListQuizzesQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListQuizzesQueryProps>(
    {
      imageFileName: faker.string.nanoid(),
    },
    params,
  );

  return new ListQuizzesQuery(props);
});
