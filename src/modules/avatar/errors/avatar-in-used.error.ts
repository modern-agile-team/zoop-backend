import { BaseError } from '@common/base/base.error';

export class AvatarInUsedError extends BaseError {
  static CODE = 'AVATAR.IN_USED';

  constructor(message?: string) {
    super(message ?? 'Avatar is in used', AvatarInUsedError.CODE);
  }
}
