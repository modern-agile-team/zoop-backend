import { SoundEffectDtoAssembler } from '@module/sound-effect/assemblers/sound-effect-dto.assembler';
import { SoundEffectCollectionAdminDto } from '@module/sound-effect/dto/sound-effect-collection.admin-dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';

import { OffsetPage } from '@common/base/base.entity';

export class SoundEffectCollectionDtoAssembler {
  static convertToAdminDto(page: OffsetPage<SoundEffect>) {
    const dto = new SoundEffectCollectionAdminDto();

    dto.data = page.data.map(SoundEffectDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
