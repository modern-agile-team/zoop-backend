import { AvatarDtoAssembler } from '@module/avatar/assemblers/avatar-dto.assembler';
import { AvatarCollectionAdminDto } from '@module/avatar/dto/avatar-collection.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';

import { OffsetPage } from '@common/base/base.entity';

export class AvatarCollectionDtoAssembler {
  static convertToAdminDto(page: OffsetPage<Avatar>): AvatarCollectionAdminDto {
    const dto = new AvatarCollectionAdminDto();

    dto.data = page.data.map(AvatarDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
