import { Injectable } from '@nestjs/common';

import {
  InjectTransactionHost,
  TransactionHost,
} from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Prisma } from '@prisma/client';

import { Quiz } from '@module/quiz/entities/quiz.entity';
import { QuizMapper } from '@module/quiz/mappers/quiz.mapper';
import {
  FindAllQuizzesOffsetPaginatedParams,
  QuizFilter,
  QuizOrder,
  QuizRaw,
  QuizRepositoryPort,
} from '@module/quiz/repositories/quiz/quiz.repository.port';

import {
  BaseRepository,
  ICursorPaginated,
  ICursorPaginatedParams,
  IOffsetPaginated,
} from '@common/base/base.repository';

@Injectable()
export class QuizRepository
  extends BaseRepository<Quiz, QuizRaw>
  implements QuizRepositoryPort
{
  protected TABLE_NAME = 'quiz';

  constructor(
    @InjectTransactionHost()
    protected readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {
    super(txHost, QuizMapper);
  }

  async insertMany(quizzes: Quiz[]): Promise<void> {
    await this.txHost.tx.quiz.createMany({
      data: quizzes.map((quiz) => QuizMapper.toPersistence(quiz)),
    });
  }

  async findAllOffsetPaginated(
    params: FindAllQuizzesOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<Quiz>> {
    const { pageInfo, order, filter } = params;

    const where: Prisma.QuizWhereInput = {};

    if (filter?.imageFileName !== undefined) {
      where.imageFileName = filter.imageFileName;
    }

    const [quizzes, totalCount] = await Promise.all([
      this.txHost.tx.quiz.findMany({
        skip: pageInfo.offset,
        take: pageInfo.limit,
        orderBy: this.toOrderBy(order ?? [{ field: 'id', direction: 'asc' }]),
        where,
      }),
      this.txHost.tx.quiz.count({ where }),
    ]);

    return {
      offset: pageInfo.offset,
      limit: pageInfo.limit,
      totalCount: totalCount,
      data: quizzes.map((quiz) => this.mapper.toEntity(quiz)),
    };
  }

  async findManyByFileNames(fileNames: Set<string>): Promise<Quiz[]> {
    const quizzes = await this.txHost.tx.quiz.findMany({
      where: {
        imageFileName: {
          in: Array.from(fileNames),
        },
      },
    });

    return quizzes.map((quiz) => this.mapper.toEntity(quiz));
  }

  findAllCursorPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ICursorPaginatedParams<QuizOrder, QuizFilter>,
  ): Promise<ICursorPaginated<Quiz>> {
    throw new Error('Method not implemented.');
  }
}
