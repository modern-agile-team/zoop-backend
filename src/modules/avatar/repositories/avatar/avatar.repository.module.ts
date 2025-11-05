import { Module } from '@nestjs/common';

import { AvatarRepository } from '@module/avatar/repositories/avatar/avatar.repository';
import { AVATAR_REPOSITORY } from '@module/avatar/repositories/avatar/avatar.repository.port';

@Module({
  providers: [
    {
      provide: AVATAR_REPOSITORY,
      useClass: AvatarRepository,
    },
  ],
  exports: [AVATAR_REPOSITORY],
})
export class AvatarRepositoryModule {}
