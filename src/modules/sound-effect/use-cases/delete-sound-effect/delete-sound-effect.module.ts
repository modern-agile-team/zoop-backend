import { Module } from '@nestjs/common';

import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import { DeleteSoundEffectController } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.controller';
import { DeleteSoundEffectHandler } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.handler';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [AwsS3Module, EventStoreModule, SoundEffectRepositoryModule],
  controllers: [DeleteSoundEffectController],
  providers: [DeleteSoundEffectHandler],
})
export class DeleteSoundEffectModule {}
