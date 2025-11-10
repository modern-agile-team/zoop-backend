import { Injectable } from '@nestjs/common';

import {
  InjectTransactionHost,
  TransactionHost,
} from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarMapper } from '@module/avatar/mappers/avatar.mapper';
import {
  AvatarFilter,
  AvatarOrder,
  AvatarRaw,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';

import {
  BaseRepository,
  ICursorPaginated,
  ICursorPaginatedParams,
} from '@common/base/base.repository';

@Injectable()
export class AvatarRepository
  extends BaseRepository<Avatar, AvatarRaw>
  implements AvatarRepositoryPort
{
  protected TABLE_NAME = 'avatar';

  constructor(
    @InjectTransactionHost()
    protected readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {
    super(txHost, AvatarMapper);
  }

  findAllCursorPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ICursorPaginatedParams<AvatarOrder, AvatarFilter>,
  ): Promise<ICursorPaginated<Avatar>> {
    throw new Error('Method not implemented.');
  }
}
