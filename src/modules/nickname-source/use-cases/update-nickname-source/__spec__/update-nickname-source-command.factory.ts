import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateNicknameSourceCommandProps,
  UpdateNicknameSourceCommand,
} from '@module/nickname-source/use-cases/update-nickname-source/update-nickname-source.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateNicknameSourceCommandFactory = Factory.define<
  UpdateNicknameSourceCommand,
  void,
  UpdateNicknameSourceCommand,
  Partial<IUpdateNicknameSourceCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateNicknameSourceCommandProps>(
    {
      nicknameSourceId: generateEntityId(),
      name: faker.string.nanoid(10),
    },
    params,
  );

  return new UpdateNicknameSourceCommand(props);
});
