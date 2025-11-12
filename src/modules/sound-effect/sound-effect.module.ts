import { Module } from '@nestjs/common';

import { CreateSoundEffectModule } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.module';

@Module({
  imports: [CreateSoundEffectModule],
})
export class SoundEffectModule {}
