import { Injectable } from '@nestjs/common';

import {
  InjectTransactionHost,
  TransactionHost,
} from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { BackgroundMusicMapper } from '@module/background-music/mappers/background-music.mapper';
import {
  BackgroundMusicFilter,
  BackgroundMusicOrder,
  BackgroundMusicRaw,
  BackgroundMusicRepositoryPort,
  FindAllBackgroundMusicsOffsetPaginatedParams,
} from '@module/background-music/repositories/background-music/background-music.repository.port';

import {
  BaseRepository,
  ICursorPaginated,
  ICursorPaginatedParams,
  IOffsetPaginated,
} from '@common/base/base.repository';

@Injectable()
export class BackgroundMusicRepository
  extends BaseRepository<BackgroundMusic, BackgroundMusicRaw>
  implements BackgroundMusicRepositoryPort
{
  protected TABLE_NAME = 'backgroundMusic';

  constructor(
    @InjectTransactionHost()
    protected readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {
    super(txHost, BackgroundMusicMapper);
  }

  async findAllOffsetPaginated(
    params: FindAllBackgroundMusicsOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<BackgroundMusic>> {
    const { pageInfo } = params;

    const [backgroundMusics, totalCount] = await Promise.all([
      this.txHost.tx.backgroundMusic.findMany({
        skip: pageInfo.offset,
        take: pageInfo.limit,
        orderBy: this.toOrderBy([{ field: 'id', direction: 'asc' }]),
      }),
      this.txHost.tx.backgroundMusic.count({}),
    ]);

    return {
      offset: pageInfo.offset,
      limit: pageInfo.limit,
      totalCount: totalCount,
      data: backgroundMusics.map((backgroundMusic) =>
        BackgroundMusicMapper.toEntity(backgroundMusic),
      ),
    };
  }

  findAllCursorPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ICursorPaginatedParams<BackgroundMusicOrder, BackgroundMusicFilter>,
  ): Promise<ICursorPaginated<BackgroundMusic>> {
    throw new Error('Method not implemented.');
  }
}
