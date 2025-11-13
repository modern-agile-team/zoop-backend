import { Module } from '@nestjs/common';

import { CreateAvatarModule } from '@module/avatar/use-cases/create-avatar/create-avatar.module';
import { ListAvatarsModule } from '@module/avatar/use-cases/list-avatars/list-avatars.module';
import { UpdateAvatarModule } from '@module/avatar/use-cases/update-avatar/update-avatar.module';

@Module({
  imports: [CreateAvatarModule, ListAvatarsModule, UpdateAvatarModule],
})
export class AvatarModule {}
