import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class ListQuizzesDto {
  @ApiProperty({
    description: '이미지 파일 이름으로 필터링',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageFileName?: string;
}
