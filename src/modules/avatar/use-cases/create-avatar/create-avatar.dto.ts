import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class CreateAvatarDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(1e7) // 10MB
  file: MemoryStoredFile;

  @ApiProperty({
    default: 'originalFIleName의 확장자를 제외함',
    required: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '아바타 설명',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
