import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateAccountCommandProps,
  UpdateAccountCommand,
} from '@module/account/use-cases/update-account/update-account.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateAccountCommandFactory = Factory.define<
  UpdateAccountCommand,
  void,
  UpdateAccountCommand,
  Partial<IUpdateAccountCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateAccountCommandProps>(
    {
      accountId: generateEntityId(),
      nickname: faker.string.nanoid(10),
      avatarFileName: faker.string.nanoid(),
    },
    params,
  );

  return new UpdateAccountCommand(props);
});
