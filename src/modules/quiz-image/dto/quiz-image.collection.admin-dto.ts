import { ApiProperty } from '@nestjs/swagger';

import { QuizImageAdminDto } from '@module/quiz-image/dto/quiz-image.admin-dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class QuizImageCollectionAdminDto extends BaseOffsetPaginationResponseDto<QuizImageAdminDto> {
  @ApiProperty({
    type: [QuizImageAdminDto],
  })
  data: QuizImageAdminDto[];
}
