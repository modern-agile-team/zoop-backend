import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@common/base/base.dto';

export class SoundEffectDto extends BaseResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  soundEffectFileName: string;

  @ApiProperty()
  soundEffectUrl: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  contentLength: number;

  @ApiProperty({ nullable: true })
  description: string | null;
}
