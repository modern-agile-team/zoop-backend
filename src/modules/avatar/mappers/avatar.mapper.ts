import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRaw } from '@module/avatar/repositories/avatar/avatar.repository.port';

import { BaseMapper } from '@common/base/base.mapper';

export class AvatarMapper extends BaseMapper {
  static toEntity(raw: AvatarRaw): Avatar {
    return new Avatar({
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
        width: raw.width,
        height: raw.height,
        description: raw.description ?? undefined,
        usageCount: raw.usageCount,
      },
    });
  }

  static toPersistence(entity: Avatar): AvatarRaw {
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
      width: entity.width,
      height: entity.height,
      description: entity.description ?? null,
      usageCount: entity.usageCount,
    };
  }
}
