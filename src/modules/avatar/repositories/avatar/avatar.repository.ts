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
  FindAllAvatarsOffsetPaginatedParams,
} from '@module/avatar/repositories/avatar/avatar.repository.port';

import {
  BaseRepository,
  ICursorPaginated,
  ICursorPaginatedParams,
  IOffsetPaginated,
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

  async findAllOffsetPaginated(
    params: FindAllAvatarsOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<Avatar>> {
    const { pageInfo } = params;

    const [avatars, totalCount] = await Promise.all([
      this.txHost.tx.avatar.findMany({
        skip: pageInfo.offset,
        take: pageInfo.limit,
        orderBy: this.toOrderBy(
          params.order ?? [{ field: 'id', direction: 'asc' }],
        ),
      }),
      this.txHost.tx.avatar.count({}),
    ]);

    return {
      offset: pageInfo.offset,
      limit: pageInfo.limit,
      totalCount: totalCount,
      data: avatars.map((avatar) => this.mapper.toEntity(avatar)),
    };
  }

  async findManyByAvatarFileNames(
    avatarFileNames: Set<string>,
  ): Promise<Avatar[]> {
    const avatars = await this.txHost.tx.avatar.findMany({
      where: {
        fileName: {
          in: Array.from(avatarFileNames),
        },
      },
    });

    return avatars.map((avatar) => this.mapper.toEntity(avatar));
  }

  findAllCursorPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ICursorPaginatedParams<AvatarOrder, AvatarFilter>,
  ): Promise<ICursorPaginated<Avatar>> {
    throw new Error('Method not implemented.');
  }
}
