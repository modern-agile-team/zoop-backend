import { Factory } from 'fishery';

import {
  CreateQuizzesCommand,
  ICreateQuizzesCommandProps,
} from '@module/quiz/use-cases/create-quizzes/create-quizzes.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

type CreateQuizzesCommandFactoryProps = {
  props: ICreateQuizzesCommandProps[];
};

export const CreateQuizzesCommandFactory = Factory.define<
  CreateQuizzesCommand,
  void,
  CreateQuizzesCommand,
  Partial<CreateQuizzesCommandFactoryProps>
>(({ params }) => {
  const { props } = createFactoryProps<CreateQuizzesCommandFactoryProps>(
    {
      props: [],
    },
    params,
  );

  return new CreateQuizzesCommand(props);
});
