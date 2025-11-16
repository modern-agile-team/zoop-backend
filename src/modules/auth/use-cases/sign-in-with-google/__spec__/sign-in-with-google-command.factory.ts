import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  ISignInWithGoogleCommandProps,
  SignInWithGoogleCommand,
} from '@module/auth/use-cases/sign-in-with-google/sign-in-with-google.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const SignInWithGoogleCommandFactory = Factory.define<
  SignInWithGoogleCommand,
  void,
  SignInWithGoogleCommand,
  Partial<ISignInWithGoogleCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ISignInWithGoogleCommandProps>(
    {
      uid: faker.string.nanoid(),
    },
    params,
  );

  return new SignInWithGoogleCommand(props);
});
