import { ApiProperty } from '@nestjs/swagger';

import { QuizAdminDto } from '@module/quiz/dto/quiz.admin-dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class QuizCollectionAdminDto extends BaseOffsetPaginationResponseDto<QuizAdminDto> {
  @ApiProperty({
    type: [QuizAdminDto],
  })
  data: QuizAdminDto[];
}
