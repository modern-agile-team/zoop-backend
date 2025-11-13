import { BaseError } from '@common/base/base.error';

export class AvatarNotFoundError extends BaseError {
  static CODE = 'AVATAR.NOT_FOUND';

  constructor(message?: string) {
    super(message ?? 'Avatar not found', AvatarNotFoundError.CODE);
  }
}
