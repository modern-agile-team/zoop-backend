import { ApiProperty } from '@nestjs/swagger';

import { AccountAdminDto } from '@module/account/dto/account.admin-dto';
import { AccountDto } from '@module/account/dto/account.dto';

import { BaseOffsetPaginationResponseDto } from '@common/base/base.dto';

export class AccountCollectionAdminDto extends BaseOffsetPaginationResponseDto<AccountDto> {
  @ApiProperty({
    type: [AccountAdminDto],
  })
  data: AccountAdminDto[];
}
