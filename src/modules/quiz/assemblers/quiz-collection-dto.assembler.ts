import { QuizDtoAssembler } from '@module/quiz/assemblers/quiz-dto.assembler';
import { QuizCollectionAdminDto } from '@module/quiz/dto/quiz-collection.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';

import { OffsetPage } from '@common/base/base.entity';

export class QuizCollectionDtoAssembler {
  static convertToAdminDto(page: OffsetPage<Quiz>): QuizCollectionAdminDto {
    const dto = new QuizCollectionAdminDto();

    dto.data = page.data.map(QuizDtoAssembler.convertToAdminDto);
    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;

    return dto;
  }
}
