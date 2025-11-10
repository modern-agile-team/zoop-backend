import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { UpdateAvatarCommand } from '@module/avatar/use-cases/update-avatar/update-avatar.command';

import { generateEntityId } from '@common/base/base.entity';

export const UpdateAvatarCommandFactory = Factory.define<UpdateAvatarCommand>(
  UpdateAvatarCommand.name,
  UpdateAvatarCommand,
).attrs({
  avatarId: () => generateEntityId(),
  name: () => faker.word.noun(),
  description: () => faker.lorem.sentence(),
});
