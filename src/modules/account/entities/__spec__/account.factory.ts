import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  Account,
  AccountProps,
  AccountRole,
  SignInType,
  SocialProvider,
} from '@module/account/entities/account.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type AccountFactoryAttributes = AccountProps & BaseEntityProps;

export const AccountFactory = Factory.define<
  Account,
  void,
  Account,
  Partial<AccountFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<AccountFactoryAttributes>(
    {
      id: generateEntityId(),
      role: faker.helpers.arrayElement(Object.values(AccountRole)),
      signInType: faker.helpers.arrayElement(Object.values(SignInType)),
      socialProvider: faker.helpers.enumValue(SocialProvider),
      socialProviderUid: faker.string.nanoid(),
      username: generateEntityId(),
      password: faker.internet.password(),
      nickname: generateEntityId(),
      avatarFileName: faker.string.nanoid(),
      enteredAt: faker.date.past(),
      leftAt: faker.date.future(),
      lastSignedInAt: faker.date.recent(),
      isActive: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new Account({ id, createdAt, updatedAt, props });
});
