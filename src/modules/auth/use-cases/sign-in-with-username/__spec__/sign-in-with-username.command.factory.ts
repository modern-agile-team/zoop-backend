import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  ISignInWithUsernameCommandProps,
  SignInWithUsernameCommand,
} from '@module/auth/use-cases/sign-in-with-username/sign-in-with-username.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const SignInWithUsernameCommandFactory = Factory.define<
  SignInWithUsernameCommand,
  void,
  SignInWithUsernameCommand,
  Partial<ISignInWithUsernameCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ISignInWithUsernameCommandProps>(
    {
      username: faker.string.nanoid(10),
      password: faker.string.uuid(),
    },
    params,
  );

  return new SignInWithUsernameCommand(props);
});
