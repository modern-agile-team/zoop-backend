import { Module } from '@nestjs/common';

import { NestjsFormDataModule } from 'nestjs-form-data';

import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import { CreateSoundEffectController } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.controller';
import { CreateSoundEffectHandler } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.handler';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [
    EventStoreModule,
    SoundEffectRepositoryModule,
    NestjsFormDataModule,
    AwsS3Module,
  ],
  controllers: [CreateSoundEffectController],
  providers: [CreateSoundEffectHandler],
})
export class CreateSoundEffectModule {}
