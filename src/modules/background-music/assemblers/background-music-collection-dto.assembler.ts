import { BackgroundMusicDtoAssembler } from '@module/background-music/assemblers/background-music-dto.assembler';
import { BackgroundMusicCollectionAdminDto } from '@module/background-music/dto/background-music-collection.admin-dto';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';

import { OffsetPage } from '@common/base/base.entity';

export class BackgroundMusicCollectionDtoAssembler {
  static convertToAdminDto(page: OffsetPage<BackgroundMusic>) {
    const dto = new BackgroundMusicCollectionAdminDto();

    dto.data = page.data.map(BackgroundMusicDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
