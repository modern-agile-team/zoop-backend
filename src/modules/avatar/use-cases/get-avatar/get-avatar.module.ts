import { Module } from '@nestjs/common';

import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import { GetAvatarController } from '@module/avatar/use-cases/get-avatar/get-avatar.controller';
import { GetAvatarHandler } from '@module/avatar/use-cases/get-avatar/get-avatar.handler';

@Module({
  imports: [AvatarRepositoryModule],
  controllers: [GetAvatarController],
  providers: [GetAvatarHandler],
})
export class GetAvatarModule {}
