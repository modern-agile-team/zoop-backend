import { Injectable } from '@nestjs/common';

import {
  InjectTransactionHost,
  TransactionHost,
} from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectMapper } from '@module/sound-effect/mappers/sound-effect.mapper';
import {
  SoundEffectFilter,
  SoundEffectOrder,
  SoundEffectRaw,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';

import {
  BaseRepository,
  ICursorPaginated,
  ICursorPaginatedParams,
} from '@common/base/base.repository';

@Injectable()
export class SoundEffectRepository
  extends BaseRepository<SoundEffect, SoundEffectRaw>
  implements SoundEffectRepositoryPort
{
  protected TABLE_NAME = 'soundEffect';

  constructor(
    @InjectTransactionHost()
    protected readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {
    super(txHost, SoundEffectMapper);
  }

  findAllCursorPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ICursorPaginatedParams<SoundEffectOrder, SoundEffectFilter>,
  ): Promise<ICursorPaginated<SoundEffect>> {
    throw new Error('Method not implemented.');
  }
}
