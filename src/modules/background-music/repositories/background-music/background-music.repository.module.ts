import { Module } from '@nestjs/common';

import { BackgroundMusicRepository } from '@module/background-music/repositories/background-music/background-music.repository';
import { BACKGROUND_MUSIC_REPOSITORY } from '@module/background-music/repositories/background-music/background-music.repository.port';

@Module({
  providers: [
    {
      provide: BACKGROUND_MUSIC_REPOSITORY,
      useClass: BackgroundMusicRepository,
    },
  ],
  exports: [BACKGROUND_MUSIC_REPOSITORY],
})
export class BackgroundMusicRepositoryModule {}
