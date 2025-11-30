import { ApiProperty } from '@nestjs/swagger';

import { BackgroundMusicAdminDto } from '@module/background-music/dto/background-music-admin.dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class BackgroundMusicCollectionAdminDto extends BaseOffsetPaginationResponseDto<BackgroundMusicAdminDto> {
  @ApiProperty({
    type: [BackgroundMusicAdminDto],
  })
  data: BackgroundMusicAdminDto[];
}
