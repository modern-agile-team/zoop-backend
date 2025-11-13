import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSoundEffectAdminDto {
  @ApiProperty({
    required: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string | null;
}
