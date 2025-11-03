import { ApiProperty } from '@nestjs/swagger';

import { QuizAdminDto } from '@module/quiz/dto/quiz.admin-dto';

export class QuizCollectionAdminDto {
  @ApiProperty({
    type: [QuizAdminDto],
  })
  data: QuizAdminDto[];
}
