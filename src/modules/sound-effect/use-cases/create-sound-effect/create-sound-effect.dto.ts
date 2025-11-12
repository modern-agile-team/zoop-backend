import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class CreateSoundEffectDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(5e7) // 50MB
  file: MemoryStoredFile;

  @ApiProperty({
    default: 'originalFileName의 확장자를 제외함',
    required: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
