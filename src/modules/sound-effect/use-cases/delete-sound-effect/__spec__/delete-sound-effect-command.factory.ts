import { Factory } from 'rosie';

import { DeleteSoundEffectCommand } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.command';

import { generateEntityId } from '@common/base/base.entity';

export const DeleteSoundEffectCommandFactory =
  Factory.define<DeleteSoundEffectCommand>(
    DeleteSoundEffectCommand.name,
    DeleteSoundEffectCommand,
  ).attrs({
    soundEffectId: () => generateEntityId(),
  });
