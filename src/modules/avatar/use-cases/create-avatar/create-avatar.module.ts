import { Module } from '@nestjs/common';

import { NestjsFormDataModule } from 'nestjs-form-data';

import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { CreateAvatarController } from '@module/avatar/use-cases/create-avatar/create-avatar.controller';
import { CreateAvatarHandler } from '@module/avatar/use-cases/create-avatar/create-avatar.handler';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [
    EventStoreModule,
    AvatarRepositoryModule,
    NestjsFormDataModule,
    AwsS3Module,
  ],
  controllers: [CreateAvatarController],
  providers: [CreateAvatarHandler],
})
export class CreateAvatarModule {}
