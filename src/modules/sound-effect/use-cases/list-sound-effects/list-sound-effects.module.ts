import { Module } from '@nestjs/common';

import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import { ListSoundEffectsAdminHandler } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects-admin.handler';
import { ListSoundEffectsController } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.controller';

@Module({
  imports: [SoundEffectRepositoryModule],
  controllers: [ListSoundEffectsController],
  providers: [ListSoundEffectsAdminHandler],
})
export class ListSoundEffectsModule {}
