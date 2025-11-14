import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListAccountsAdminDto {
  @ApiProperty({
    description: '아바타 파일명으로 필터링',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatarFileName?: string;

  @ApiProperty({
    required: false,
    minimum: 1,
  })
  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    required: false,
    minimum: 5,
    maximum: 1000,
    default: 20,
  })
  @Max(1000)
  @Min(5)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;
}
