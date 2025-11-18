import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateNicknameSourceCommand,
  ICreateNicknameSourceCommandProps,
} from '@module/nickname-source/use-cases/create-nickname-source/create-nickname-source.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateNicknameSourceCommandFactory = Factory.define<
  CreateNicknameSourceCommand,
  void,
  CreateNicknameSourceCommand,
  Partial<ICreateNicknameSourceCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateNicknameSourceCommandProps>(
    {
      name: faker.string.nanoid(10),
    },
    params,
  );

  return new CreateNicknameSourceCommand(props);
});
