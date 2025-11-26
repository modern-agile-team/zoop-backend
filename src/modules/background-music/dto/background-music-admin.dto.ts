import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@common/base/base.dto';

export class BackgroundMusicAdminDto extends BaseResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  durationInSeconds: number;

  @ApiProperty()
  backgroundMusicFileName: string;

  @ApiProperty()
  backgroundMusicUrl: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  contentLength: number;

  @ApiProperty({ type: String, nullable: true })
  description: string | null;
}
