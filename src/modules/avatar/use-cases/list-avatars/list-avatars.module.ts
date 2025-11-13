import { Module } from '@nestjs/common';

import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { ListAvatarsController } from '@module/avatar/use-cases/list-avatars/list-avatars.controller';
import { ListAvatarsHandler } from '@module/avatar/use-cases/list-avatars/list-avatars.handler';

@Module({
  imports: [AvatarRepositoryModule],
  controllers: [ListAvatarsController],
  providers: [ListAvatarsHandler],
})
export class ListAvatarsModule {}
