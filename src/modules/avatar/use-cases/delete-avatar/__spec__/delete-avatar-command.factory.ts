import { Factory } from 'rosie';

import { DeleteAvatarCommand } from '@module/avatar/use-cases/delete-avatar/delete-avatar.command';

import { generateEntityId } from '@common/base/base.entity';

export const DeleteAvatarCommandFactory = Factory.define<DeleteAvatarCommand>(
  DeleteAvatarCommand.name,
  DeleteAvatarCommand,
).attrs({
  avatarId: () => generateEntityId(),
});
