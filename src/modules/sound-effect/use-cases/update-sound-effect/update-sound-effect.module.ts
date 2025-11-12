import { Module } from '@nestjs/common';

import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import { UpdateSoundEffectController } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.controller';
import { UpdateSoundEffectHandler } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.handler';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [EventStoreModule, SoundEffectRepositoryModule],
  controllers: [UpdateSoundEffectController],
  providers: [UpdateSoundEffectHandler],
})
export class UpdateSoundEffectModule {}
