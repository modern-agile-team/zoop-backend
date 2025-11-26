import { Module } from '@nestjs/common';

import { NestjsFormDataModule } from 'nestjs-form-data';

import { BackgroundMusicRepositoryModule } from '@module/background-music/repositories/background-music/background-music.repository.module';
import { CreateBackgroundMusicController } from '@module/background-music/use-cases/create-background-music/create-background-music.controller';
import { CreateBackgroundMusicHandler } from '@module/background-music/use-cases/create-background-music/create-background-music.handler';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [
    NestjsFormDataModule,
    EventStoreModule,
    BackgroundMusicRepositoryModule,
    AwsS3Module,
  ],
  controllers: [CreateBackgroundMusicController],
  providers: [CreateBackgroundMusicHandler],
})
export class CreateBackgroundMusicModule {}
