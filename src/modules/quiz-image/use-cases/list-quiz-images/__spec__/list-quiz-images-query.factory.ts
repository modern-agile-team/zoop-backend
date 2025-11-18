import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IListQuizImagesQueryProps,
  ListQuizImagesQuery,
} from '@module/quiz-image/use-cases/list-quiz-images/list-quiz-images.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListQuizImagesQueryFactory = Factory.define<
  ListQuizImagesQuery,
  void,
  ListQuizImagesQuery,
  Partial<IListQuizImagesQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListQuizImagesQueryProps>(
    {
      category: faker.word.noun(),
      page: faker.number.int({ min: 1, max: 10 }),
      perPage: faker.number.int({ min: 1, max: 50 }),
    },
    params,
  );

  return new ListQuizImagesQuery(props);
});
