import { BackgroundMusicAdminDto } from '@module/background-music/dto/background-music-admin.dto';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class BackgroundMusicDtoAssembler {
  static convertToAdminDto(
    backgroundMusic: BackgroundMusic,
  ): BackgroundMusicAdminDto {
    const dto = new BackgroundMusicAdminDto({
      id: backgroundMusic.id,
      createdAt: backgroundMusic.createdAt,
      updatedAt: backgroundMusic.updatedAt,
    });

    dto.name = backgroundMusic.name;
    dto.originalFileName = backgroundMusic.originalFileName;
    dto.durationInSeconds = backgroundMusic.durationInSeconds;
    dto.backgroundMusicFileName = backgroundMusic.fileName;
    dto.backgroundMusicUrl = AssetUrlManager.fileNameToUrl(
      backgroundMusic.fileName,
      'backgroundMusic',
    );
    dto.extension = backgroundMusic.extension;
    dto.contentType = backgroundMusic.contentType;
    dto.contentLength = Number(backgroundMusic.contentLength);
    dto.description = backgroundMusic.description ?? null;

    return dto;
  }
}
