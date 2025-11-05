import { Module } from '@nestjs/common';

import { SoundEffectRepository } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository';
import { SOUND_EFFECT_REPOSITORY } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';

@Module({
  providers: [
    {
      provide: SOUND_EFFECT_REPOSITORY,
      useClass: SoundEffectRepository,
    },
  ],
  exports: [SOUND_EFFECT_REPOSITORY],
})
export class SoundEffectRepositoryModule {}
