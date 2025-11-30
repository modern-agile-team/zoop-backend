import { Module } from '@nestjs/common';

import { BackgroundMusicRepositoryModule } from '@module/background-music/repositories/background-music/background-music.repository.module';
import { ListBackgroundMusicsAdminHandler } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-handler';
import { ListBackgroundMusicsController } from '@module/background-music/use-cases/list-background-musics/list-background-musics.controller';

@Module({
  imports: [BackgroundMusicRepositoryModule],
  controllers: [ListBackgroundMusicsController],
  providers: [ListBackgroundMusicsAdminHandler],
})
export class ListBackgroundMusicsModule {}
