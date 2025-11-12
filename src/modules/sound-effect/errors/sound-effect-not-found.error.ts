import { BaseError } from '@common/base/base.error';

export class SoundEffectNotFoundError extends BaseError {
  static CODE = 'SOUND_EFFECT.NOT_FOUND';

  constructor() {
    super('Sound effect not found', SoundEffectNotFoundError.CODE);
  }
}
