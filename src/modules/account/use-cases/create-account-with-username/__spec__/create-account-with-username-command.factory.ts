import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  AccountRole,
  SignInType,
} from '@module/account/entities/account.entity';
import {
  CreateAccountWithUsernameCommand,
  ICreateAccountWithUsernameCommandProps,
} from '@module/account/use-cases/create-account-with-username/create-account-with-username.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateAccountWithUsernameCommandFactory = Factory.define<
  CreateAccountWithUsernameCommand,
  void,
  CreateAccountWithUsernameCommand,
  Partial<ICreateAccountWithUsernameCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateAccountWithUsernameCommandProps>(
    {
      role: faker.helpers.arrayElement(Object.values(AccountRole)),
      signInType: faker.helpers.arrayElement(Object.values(SignInType)),
      username: faker.string.nanoid(20),
      password: faker.internet.password(),
    },
    params,
  );

  return new CreateAccountWithUsernameCommand(props);
});
