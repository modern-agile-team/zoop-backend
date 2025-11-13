import { BaseError } from '@common/base/base.error';

export class AccountAvatarNotFoundError extends BaseError {
  static CODE: string = 'ACCOUNT.AVATAR_NOT_FOUND';

  constructor(message?: string) {
    super(message ?? 'Avatar not found', AccountAvatarNotFoundError.CODE);
  }
}
