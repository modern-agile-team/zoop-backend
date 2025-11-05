import { NicknameSourceDtoAssembler } from '@module/nickname-source/assemblers/nickname-source-dto.assembler';
import { NicknameSourceCollectionAdminDto } from '@module/nickname-source/dto/nickname-source-collection.admin-dto';
import { NicknameSource } from '@module/nickname-source/entities/nickname-source.entity';

import { OffsetPage } from '@common/base/base.entity';

export class NicknameSourceCollectionDtoAssembler {
  static convertToAdminDto(
    page: OffsetPage<NicknameSource>,
  ): NicknameSourceCollectionAdminDto {
    const dto = new NicknameSourceCollectionAdminDto();

    dto.data = page.data.map(NicknameSourceDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
