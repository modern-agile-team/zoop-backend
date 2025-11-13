import { Module } from '@nestjs/common';

import { CreateSoundEffectModule } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.module';
import { GetSoundEffectModule } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.module';
import { ListSoundEffectsModule } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.module';
import { UpdateSoundEffectModule } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.module';

@Module({
  imports: [
    CreateSoundEffectModule,
    GetSoundEffectModule,
    ListSoundEffectsModule,
    UpdateSoundEffectModule,
  ],
})
export class SoundEffectModule {}
