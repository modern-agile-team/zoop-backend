import { ApiProperty } from '@nestjs/swagger';

import { SoundEffectAdminDto } from '@module/sound-effect/dto/sound-effect-admin.dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class SoundEffectCollectionAdminDto extends BaseOffsetPaginationResponseDto<SoundEffectAdminDto> {
  @ApiProperty({
    type: [SoundEffectAdminDto],
  })
  data: SoundEffectAdminDto[];
}
