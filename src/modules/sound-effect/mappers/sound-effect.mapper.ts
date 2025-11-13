import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectRaw } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';

import { BaseMapper } from '@common/base/base.mapper';

export class SoundEffectMapper extends BaseMapper {
  static toEntity(raw: SoundEffectRaw): SoundEffect {
    return new SoundEffect({
      id: this.toEntityId(raw.id),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        fileName: raw.fileName,
        originalFileName: raw.originalFileName,
        name: raw.name,
        extension: raw.extension,
        contentLength: raw.contentLength,
        contentType: raw.contentType,
        description: raw.description ?? null,
      },
    });
  }

  static toPersistence(entity: SoundEffect): SoundEffectRaw {
    return {
      id: this.toPrimaryKey(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      fileName: entity.fileName,
      originalFileName: entity.originalFileName,
      name: entity.name,
      extension: entity.extension,
      contentLength: entity.contentLength,
      contentType: entity.contentType,
      description: entity.description ?? null,
    };
  }
}
