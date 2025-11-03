import { QuizDtoAssembler } from '@module/quiz/assemblers/quiz-dto.assembler';
import { QuizCollectionAdminDto } from '@module/quiz/dto/quiz-collection.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';

export class QuizCollectionDtoAssembler {
  static convertToAdminDto(quizzes: Quiz[]): QuizCollectionAdminDto {
    const dto = new QuizCollectionAdminDto();

    dto.data = quizzes.map((quiz) => QuizDtoAssembler.convertToAdminDto(quiz));

    return dto;
  }
}
