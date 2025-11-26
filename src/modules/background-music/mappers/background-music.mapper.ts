import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { BackgroundMusicRaw } from '@module/background-music/repositories/background-music/background-music.repository.port';

import { BaseMapper } from '@common/base/base.mapper';

export class BackgroundMusicMapper extends BaseMapper {
  static toEntity(raw: BackgroundMusicRaw): BackgroundMusic {
    return new BackgroundMusic({
      id: this.toEntityId(raw.id),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        fileName: raw.fileName,
        originalFileName: raw.originalFileName,
        durationInSeconds: raw.durationInSeconds,
        name: raw.name,
        extension: raw.extension,
        contentLength: raw.contentLength,
        contentType: raw.contentType,
        description: raw.description ?? null,
      },
    });
  }

  static toPersistence(entity: BackgroundMusic): BackgroundMusicRaw {
    return {
      id: this.toPrimaryKey(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      fileName: entity.fileName,
      originalFileName: entity.originalFileName,
      durationInSeconds: entity.durationInSeconds,
      name: entity.name,
      extension: entity.extension,
      contentLength: entity.contentLength,
      contentType: entity.contentType,
      description: entity.description ?? null,
    };
  }
}
