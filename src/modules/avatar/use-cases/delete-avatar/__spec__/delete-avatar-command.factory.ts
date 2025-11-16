import { Factory } from 'fishery';

import {
  DeleteAvatarCommand,
  IDeleteAvatarCommandProps,
} from '@module/avatar/use-cases/delete-avatar/delete-avatar.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const DeleteAvatarCommandFactory = Factory.define<
  DeleteAvatarCommand,
  void,
  DeleteAvatarCommand,
  Partial<IDeleteAvatarCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IDeleteAvatarCommandProps>(
    {
      avatarId: generateEntityId(),
    },
    params,
  );

  return new DeleteAvatarCommand(props);
});
