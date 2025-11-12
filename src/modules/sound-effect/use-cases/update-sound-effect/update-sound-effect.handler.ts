import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { UpdateSoundEffectCommand } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.command';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(UpdateSoundEffectCommand)
export class UpdateSoundEffectHandler
  implements ICommandHandler<UpdateSoundEffectCommand, SoundEffect>
{
  constructor(
    @Inject(SOUND_EFFECT_REPOSITORY)
    private readonly soundEffectRepository: SoundEffectRepositoryPort,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  async execute(command: UpdateSoundEffectCommand): Promise<SoundEffect> {
    const soundEffect = await this.soundEffectRepository.findOneById(
      command.soundEffectId,
    );

    if (soundEffect === undefined) {
      throw new SoundEffectNotFoundError();
    }

    soundEffect.update({
      name: command.name,
      description: command.description,
    });

    await this.soundEffectRepository.update(soundEffect);

    await this.eventStore.storeAggregateEvents(soundEffect);

    return soundEffect;
  }
}
