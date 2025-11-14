import { Quiz as QuizModel } from '@prisma/client';

import { Quiz } from '@module/quiz/entities/quiz.entity';

import {
  IOffsetPaginated,
  ISort,
  RepositoryPort,
} from '@common/base/base.repository';

export const QUIZ_REPOSITORY = Symbol('QUIZ_REPOSITORY');

export interface QuizRaw extends QuizModel {}

export interface QuizFilter {
  imageFileName?: string;
}

export interface FindAllQuizzesOffsetPaginatedParams {
  filter?: QuizFilter;
  pageInfo: {
    offset: number;
    limit: number;
  };
  order?: ISort<'createdAt'>[];
}

export interface QuizOrder extends ISort<'createdAt'> {}

export interface QuizRepositoryPort
  extends RepositoryPort<Quiz, QuizFilter, QuizOrder> {
  insertMany(quizzes: Quiz[]): Promise<void>;
  findAllOffsetPaginated(
    params: FindAllQuizzesOffsetPaginatedParams,
  ): Promise<IOffsetPaginated<Quiz>>;
  findManyByFileNames(fileNames: Set<string>): Promise<Quiz[]>;
}
