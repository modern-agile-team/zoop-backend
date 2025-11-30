import { Module } from '@nestjs/common';

import { CreateBackgroundMusicModule } from '@module/background-music/use-cases/create-background-music/create-background-music.module';
import { ListBackgroundMusicsModule } from '@module/background-music/use-cases/list-background-musics/list-background-musics.module';

@Module({
  imports: [CreateBackgroundMusicModule, ListBackgroundMusicsModule],
})
export class BackgroundMusicModule {}
