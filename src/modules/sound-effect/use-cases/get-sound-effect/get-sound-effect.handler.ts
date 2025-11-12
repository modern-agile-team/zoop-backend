import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { GetSoundEffectQuery } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.query';

@QueryHandler(GetSoundEffectQuery)
export class GetSoundEffectHandler
  implements IQueryHandler<GetSoundEffectQuery, SoundEffect>
{
  constructor(
    @Inject(SOUND_EFFECT_REPOSITORY)
    private readonly soundEffectRepository: SoundEffectRepositoryPort,
  ) {}

  async execute(query: GetSoundEffectQuery): Promise<SoundEffect> {
    const soundEffect = await this.soundEffectRepository.findOneById(
      query.soundEffectId,
    );

    if (soundEffect === undefined) {
      throw new SoundEffectNotFoundError();
    }

    return soundEffect;
  }
}
