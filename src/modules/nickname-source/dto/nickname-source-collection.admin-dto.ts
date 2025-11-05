import { ApiProperty } from '@nestjs/swagger';

import { NicknameSourceAdminDto } from '@module/nickname-source/dto/nickname-source.admin-dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class NicknameSourceCollectionAdminDto extends BaseOffsetPaginationResponseDto<NicknameSourceAdminDto> {
  @ApiProperty({
    type: [NicknameSourceAdminDto],
  })
  data: NicknameSourceAdminDto[];
}
