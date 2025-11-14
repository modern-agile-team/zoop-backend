import { AccountSocketEventDto } from '@module/account/dto/account-socket-event.dto';
import { AccountAdminDto } from '@module/account/dto/account.admin-dto';
import { AccountDto } from '@module/account/dto/account.dto';
import { Account } from '@module/account/entities/account.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class AccountDtoAssembler {
  static convertToDto(account: Account): AccountDto {
    const dto = new AccountDto({
      id: account.id,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });

    dto.role = account.role;
    dto.signInType = account.signInType;
    dto.nickname = account.nickname;
    dto.avatarFileName = account.avatarFileName;
    dto.avatarUrl = AssetUrlManager.fileNameToUrl(
      account.avatarFileName,
      'avatar',
    );
    dto.enteredAt = account.enteredAt;
    dto.leftAt = account.leftAt;
    dto.isActive = account.isActive;

    return dto;
  }

  static convertToAdminDto(account: Account): AccountAdminDto {
    const dto = new AccountAdminDto({
      id: account.id,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });

    dto.role = account.role;
    dto.signInType = account.signInType;
    dto.nickname = account.nickname;
    dto.avatarFileName = account.avatarFileName;
    dto.avatarUrl = AssetUrlManager.fileNameToUrl(
      account.avatarFileName,
      'avatar',
    );
    dto.enteredAt = account.enteredAt;
    dto.leftAt = account.leftAt;
    dto.isActive = account.isActive;

    return dto;
  }

  static convertToSocketEventDto(account: Account): AccountSocketEventDto {
    const dto = new AccountSocketEventDto();

    dto.accountId = account.id;
    dto.nickname = account.nickname;
    dto.avatarUrl = AssetUrlManager.fileNameToUrl(
      account.avatarFileName,
      'avatar',
    );

    return dto;
  }
}
