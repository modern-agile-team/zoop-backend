import { QuizImageDtoAssembler } from '@module/quiz-image/assemblers/quiz-image-dto.assembler';
import { QuizImageCollectionAdminDto } from '@module/quiz-image/dto/quiz-image.collection.admin-dto';
import { QuizImage } from '@module/quiz-image/entities/quiz-image.entity';

import { OffsetPage } from '@common/base/base.entity';

export class QuizImageCollectionDtoAssembler {
  static convertToAdminDto(
    page: OffsetPage<QuizImage>,
  ): QuizImageCollectionAdminDto {
    const dto = new QuizImageCollectionAdminDto();

    dto.data = page.data.map(QuizImageDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
