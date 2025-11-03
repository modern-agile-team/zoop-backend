import { QuizImageAdminDto } from '@module/quiz-image/dto/quiz-image.admin-dto';
import { QuizImage } from '@module/quiz-image/entities/quiz-image.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class QuizImageDtoAssembler {
  static convertToAdminDto(quizImage: QuizImage): QuizImageAdminDto {
    const dto = new QuizImageAdminDto({
      id: quizImage.id,
      createdAt: quizImage.createdAt,
      updatedAt: quizImage.updatedAt,
    });

    dto.category = quizImage.category;
    dto.name = quizImage.name;
    dto.originalFileName = quizImage.originalFileName;
    dto.quizImageFileName = quizImage.fileName;
    dto.quizImageUrl = AssetUrlManager.fileNameToUrl(
      quizImage.fileName,
      'quizImage',
    );
    dto.extension = quizImage.extension;
    dto.contentType = quizImage.contentType;
    dto.contentLength = Number(quizImage.contentLength);
    dto.width = quizImage.width;
    dto.height = quizImage.height;

    return dto;
  }
}
