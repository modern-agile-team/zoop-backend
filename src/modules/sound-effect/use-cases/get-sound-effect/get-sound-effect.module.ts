import { Module } from '@nestjs/common';

import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import { GetSoundEffectController } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.controller';
import { GetSoundEffectHandler } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.handler';

@Module({
  imports: [SoundEffectRepositoryModule],
  controllers: [GetSoundEffectController],
  providers: [GetSoundEffectHandler],
})
export class GetSoundEffectModule {}
