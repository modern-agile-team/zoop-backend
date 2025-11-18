import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  ISignUpWithUsernameCommandProps,
  SignUpWithUsernameCommand,
} from '@module/auth/use-cases/sign-up-with-username/sign-up-with-username.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const SignUpWithUsernameCommandFactory = Factory.define<
  SignUpWithUsernameCommand,
  void,
  SignUpWithUsernameCommand,
  Partial<ISignUpWithUsernameCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ISignUpWithUsernameCommandProps>(
    {
      username: faker.string.nanoid(10),
      password: faker.string.uuid(),
    },
    params,
  );

  return new SignUpWithUsernameCommand(props);
});
