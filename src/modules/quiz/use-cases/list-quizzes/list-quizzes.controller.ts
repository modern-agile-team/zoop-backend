import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizCollectionDtoAssembler } from '@module/quiz/assemblers/quiz-collection-dto.assembler';
import { QuizCollectionAdminDto } from '@module/quiz/dto/quiz-collection.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';
import { ListQuizzesDto } from '@module/quiz/use-cases/list-quizzes/list-quizzes.dto';
import { ListQuizzesQuery } from '@module/quiz/use-cases/list-quizzes/list-quizzes.query';

import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('quiz')
@Controller()
export class ListQuizzesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '퀴즈 목록 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: QuizCollectionAdminDto })
  @UseGuards(AdminGuard)
  @Get('admin/quizzes')
  async listQuizzes(
    @Query() dto: ListQuizzesDto,
  ): Promise<QuizCollectionAdminDto> {
    const query = new ListQuizzesQuery({
      imageFileName: dto.imageFileName,
    });

    const quizzes = await this.queryBus.execute<ListQuizzesQuery, Quiz[]>(
      query,
    );

    return QuizCollectionDtoAssembler.convertToAdminDto(quizzes);
  }
}
