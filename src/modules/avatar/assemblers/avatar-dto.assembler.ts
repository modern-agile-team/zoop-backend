import { AvatarAdminDto } from '@module/avatar/dto/avatar.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class AvatarDtoAssembler {
  static convertToAdminDto(avatar: Avatar): AvatarAdminDto {
    const dto = new AvatarAdminDto({
      id: avatar.id,
      createdAt: avatar.createdAt,
      updatedAt: avatar.updatedAt,
    });

    dto.name = avatar.name;
    dto.originalFileName = avatar.originalFileName;
    dto.avatarFileName = avatar.fileName;
    dto.avatarImageUrl = AssetUrlManager.fileNameToUrl(
      avatar.fileName,
      'avatar',
    );
    dto.extension = avatar.extension;
    dto.contentType = avatar.contentType;
    dto.contentLength = Number(avatar.contentLength);
    dto.width = avatar.width;
    dto.height = avatar.height;
    dto.description = avatar.description ?? null;
    dto.usageCount = avatar.usageCount;

    return dto;
  }
}
