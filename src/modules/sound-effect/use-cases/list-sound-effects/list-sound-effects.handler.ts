import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { ListSoundEffectsQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.query';

@QueryHandler(ListSoundEffectsQuery)
export class ListSoundEffectsHandler
  implements IQueryHandler<ListSoundEffectsQuery, SoundEffect[]>
{
  constructor(
    @Inject(SOUND_EFFECT_REPOSITORY)
    private readonly soundEffectRepository: SoundEffectRepositoryPort,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: ListSoundEffectsQuery): Promise<SoundEffect[]> {
    const soundEffects = this.soundEffectRepository.findAll();

    return soundEffects;
  }
}
