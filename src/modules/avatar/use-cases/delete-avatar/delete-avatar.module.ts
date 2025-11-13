import { Module } from '@nestjs/common';

import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { DeleteAvatarController } from '@module/avatar/use-cases/delete-avatar/delete-avatar.controller';
import { DeleteAvatarHandler } from '@module/avatar/use-cases/delete-avatar/delete-avatar.handler';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [
    EventStoreModule,
    AwsS3Module,
    AvatarRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [DeleteAvatarController],
  providers: [DeleteAvatarHandler],
})
export class DeleteAvatarModule {}
