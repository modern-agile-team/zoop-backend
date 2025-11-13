import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  avatarFileName?: string;
}
