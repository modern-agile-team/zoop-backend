import { AccountDtoAssembler } from '@module/account/assemblers/account-dto.assembler';
import { AccountCollectionAdminDto } from '@module/account/dto/account-collection.admin-dto';
import { AccountCollectionDto } from '@module/account/dto/account-collection.dto';
import { Account } from '@module/account/entities/account.entity';

import { OffsetPage } from '@common/base/base.entity';

export class AccountCollectionDtoAssembler {
  static convertToDto(accounts: Account[]): AccountCollectionDto {
    const dto = new AccountCollectionDto();

    dto.data = accounts.map(AccountDtoAssembler.convertToDto);

    return dto;
  }

  static convertToAdminDto(
    page: OffsetPage<Account>,
  ): AccountCollectionAdminDto {
    const dto = new AccountCollectionAdminDto();

    dto.currentPage = page.currentPage;
    dto.perPage = page.perPage;
    dto.totalCount = page.totalCount;
    dto.totalPages = page.totalPages;
    dto.data = page.data.map(AccountDtoAssembler.convertToAdminDto);

    return dto;
  }
}
