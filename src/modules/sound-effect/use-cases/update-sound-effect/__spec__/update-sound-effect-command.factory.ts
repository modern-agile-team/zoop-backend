import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

import { UpdateSoundEffectCommand } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.command';

import { generateEntityId } from '@common/base/base.entity';

export const UpdateSoundEffectCommandFactory =
  Factory.define<UpdateSoundEffectCommand>(
    UpdateSoundEffectCommand.name,
    UpdateSoundEffectCommand,
  ).attrs({
    soundEffectId: () => generateEntityId(),
    name: () => faker.word.noun(),
    description: () => faker.lorem.sentence(),
  });
