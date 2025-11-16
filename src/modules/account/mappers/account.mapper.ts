import {
  Account,
  AccountRole,
  SignInType,
  SocialProvider,
} from '@module/account/entities/account.entity';
import { AccountRaw } from '@module/account/repositories/account/account.repository.port';

import { BaseMapper } from '@common/base/base.mapper';

export class AccountMapper extends BaseMapper {
  static toEntity(raw: AccountRaw): Account {
    return new Account({
      id: this.toEntityId(raw.id),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        role: AccountRole[raw.role],
        signInType: SignInType[raw.signInType],
        socialProvider: raw.socialProvider
          ? SocialProvider[raw.socialProvider]
          : null,
        socialProviderUid: raw.socialProviderUid ?? null,
        username: raw.username ?? null,
        password: raw.password ?? null,
        nickname: raw.nickname,
        avatarFileName: raw.avatarFileName,
        enteredAt: raw.lastEnteredAt ?? null,
        leftAt: raw.lastLeftAt ?? null,
        isActive: raw.isActive,
        lastSignedInAt: raw.lastSignedInAt ?? null,
      },
    });
  }

  static toPersistence(entity: Account): AccountRaw {
    return {
      id: this.toPrimaryKey(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      role: entity.role,
      signInType: entity.signInType,
      socialProvider: entity.socialProvider ?? null,
      socialProviderUid: entity.socialProviderUid ?? null,
      username: entity.username ?? null,
      password: entity.password ?? null,
      nickname: entity.nickname,
      avatarFileName: entity.avatarFileName,
      lastEnteredAt: entity.enteredAt ?? null,
      lastSignedInAt: entity.lastSignedInAt ?? null,
      lastLeftAt: entity.leftAt ?? null,
      isActive: entity.isActive,
    };
  }
}
