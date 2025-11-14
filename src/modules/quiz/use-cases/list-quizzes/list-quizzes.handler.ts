import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Quiz } from '@module/quiz/entities/quiz.entity';
import {
  QUIZ_REPOSITORY,
  QuizRepositoryPort,
} from '@module/quiz/repositories/quiz/quiz.repository.port';
import { ListQuizzesQuery } from '@module/quiz/use-cases/list-quizzes/list-quizzes.query';

import { OffsetPage } from '@common/base/base.entity';

@QueryHandler(ListQuizzesQuery)
export class ListQuizzesHandler
  implements IQueryHandler<ListQuizzesQuery, OffsetPage<Quiz>>
{
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizRepository: QuizRepositoryPort,
  ) {}

  async execute(query: ListQuizzesQuery): Promise<OffsetPage<Quiz>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const result = await this.quizRepository.findAllOffsetPaginated({
      pageInfo: { offset: (page - 1) * perPage, limit: perPage },
      filter: { imageFileName: query.imageFileName },
    });

    return new OffsetPage(result.data, page, perPage, result.totalCount);
  }
}
