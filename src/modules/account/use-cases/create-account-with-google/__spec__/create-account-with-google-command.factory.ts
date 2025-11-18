import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { AccountRole } from '@module/account/entities/account.entity';
import {
  CreateAccountWithGoogleCommand,
  ICreateAccountWithGoogleCommandProps,
} from '@module/account/use-cases/create-account-with-google/create-account-with-google.command';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateAccountWithGoogleCommandFactory = Factory.define<
  CreateAccountWithGoogleCommand,
  void,
  CreateAccountWithGoogleCommand,
  Partial<ICreateAccountWithGoogleCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateAccountWithGoogleCommandProps>(
    {
      role: faker.helpers.enumValue(AccountRole),
      socialProviderUid: faker.string.nanoid(),
    },
    params,
  );

  return new CreateAccountWithGoogleCommand(props);
});
