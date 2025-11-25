import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@common/base/base.dto';

export class AvatarAdminDto extends BaseResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  avatarFileName: string;

  @ApiProperty()
  avatarImageUrl: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  contentLength: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  description: string | null;

  @ApiProperty()
  usageCount: number;
}
