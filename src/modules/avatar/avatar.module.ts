import { Module } from '@nestjs/common';

import { CreateAvatarModule } from '@module/avatar/use-cases/create-avatar/create-avatar.module';

@Module({
  imports: [CreateAvatarModule],
})
export class AvatarModule {}
