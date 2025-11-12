import { SoundEffect as SoundEffectModel } from '@prisma/client';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';

import { RepositoryPort } from '@common/base/base.repository';

export const SOUND_EFFECT_REPOSITORY = Symbol('SOUND_EFFECT_REPOSITORY');

export interface SoundEffectRaw extends SoundEffectModel {}

export interface SoundEffectFilter {}

export interface SoundEffectOrder {}

export interface SoundEffectRepositoryPort
  extends RepositoryPort<SoundEffect, SoundEffectFilter, SoundEffectOrder> {}
