import { ApiProperty } from '@nestjs/swagger';

import { AvatarAdminDto } from '@module/avatar/dto/avatar.admin-dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class AvatarCollectionAdminDto extends BaseOffsetPaginationResponseDto<AvatarAdminDto> {
  @ApiProperty({
    type: [AvatarAdminDto],
  })
  data: AvatarAdminDto[];
}
