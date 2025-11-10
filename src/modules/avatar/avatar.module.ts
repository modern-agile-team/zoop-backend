import { Module } from '@nestjs/common';

import { CreateAvatarModule } from '@module/avatar/use-cases/create-avatar/create-avatar.module';
import { UpdateAvatarModule } from '@module/avatar/use-cases/update-avatar/update-avatar.module';

@Module({
  imports: [CreateAvatarModule, UpdateAvatarModule],
})
export class AvatarModule {}
