import { Module } from '@nestjs/common';

import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { UpdateAvatarController } from '@module/avatar/use-cases/update-avatar/update-avatar.controller';
import { UpdateAvatarHandler } from '@module/avatar/use-cases/update-avatar/update-avatar.handler';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [EventStoreModule, AvatarRepositoryModule],
  controllers: [UpdateAvatarController],
  providers: [UpdateAvatarHandler],
})
export class UpdateAvatarModule {}
