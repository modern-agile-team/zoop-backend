import { Factory } from 'fishery';

import {
  EnterAccountCommand,
  IEnterAccountCommandProps,
} from '@module/account/use-cases/enter-account/enter-account.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const EnterAccountCommandFactory = Factory.define<
  EnterAccountCommand,
  void,
  EnterAccountCommand,
  Partial<IEnterAccountCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IEnterAccountCommandProps>(
    {
      accountId: generateEntityId(),
    },
    params,
  );

  return new EnterAccountCommand(props);
});
