import { Module } from '@nestjs/common';

import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { AvatarService } from '@module/avatar/services/avatar-service/avatar.service';
import { AVATAR_SERVICE } from '@module/avatar/services/avatar-service/avatar.service.interface';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [EventStoreModule, AvatarRepositoryModule],
  providers: [
    {
      provide: AVATAR_SERVICE,
      useClass: AvatarService,
    },
  ],
  exports: [AVATAR_SERVICE],
})
export class AvatarServiceModule {}
