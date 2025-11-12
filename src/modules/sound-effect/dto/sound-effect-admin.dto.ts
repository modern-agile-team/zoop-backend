import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@common/base/base.dto';

export class SoundEffectAdminDto extends BaseResponseDto {
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

  @ApiProperty({ required: false })
  description?: string;
}
