import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  IUpdateAvatarCommandProps,
  UpdateAvatarCommand,
} from '@module/avatar/use-cases/update-avatar/update-avatar.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const UpdateAvatarCommandFactory = Factory.define<
  UpdateAvatarCommand,
  void,
  UpdateAvatarCommand,
  Partial<IUpdateAvatarCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IUpdateAvatarCommandProps>(
    {
      avatarId: generateEntityId(),
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
    },
    params,
  );

  return new UpdateAvatarCommand(props);
});
