import { Module } from '@nestjs/common';

import { CreateSoundEffectModule } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.module';
import { ListSoundEffectsModule } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.module';

@Module({
  imports: [CreateSoundEffectModule, ListSoundEffectsModule],
})
export class SoundEffectModule {}
