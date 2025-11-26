import { Module } from '@nestjs/common';

import { CreateBackgroundMusicModule } from '@module/background-music/use-cases/create-background-music/create-background-music.module';

@Module({
  imports: [CreateBackgroundMusicModule],
})
export class BackgroundMusicModule {}
