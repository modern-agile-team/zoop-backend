import { QuizAdminDto } from '@module/quiz/dto/quiz.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class QuizDtoAssembler {
  static convertToAdminDto(quiz: Quiz): QuizAdminDto {
    const dto = new QuizAdminDto({
      id: quiz.id,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    });

    dto.type = quiz.type;
    dto.question = quiz.question ?? null;
    dto.answer = quiz.answer;
    dto.imageFileName = quiz.imageFileName ?? null;
    dto.imageUrl =
      quiz.imageFileName === null || quiz.imageFileName === undefined
        ? null
        : AssetUrlManager.fileNameToUrl(quiz.imageFileName, 'quizImage');

    return dto;
  }
}
