import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizDtoAssembler } from '@module/quiz/assemblers/quiz-dto.assembler';
import { QuizAdminDto } from '@module/quiz/dto/quiz.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';
import { QuizImageNotFoundError } from '@module/quiz/errors/quiz-image-not-found.error';
import { QuizNotFoundError } from '@module/quiz/errors/quiz-not-found.error';
import { UpdateQuizAdminDto } from '@module/quiz/use-cases/update-quiz/update-quiz.admin-dto';
import { UpdateQuizCommand } from '@module/quiz/use-cases/update-quiz/update-quiz.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('quiz')
@Controller()
export class UpdateQuizController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '퀴즈 수정' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError, QuizImageNotFoundError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [QuizNotFoundError],
  })
  @ApiOkResponse({ type: QuizAdminDto })
  @Patch('admin/quizzes/:quizId')
  async updateQuizAdmin(
    @Param('quizId') quizId: string,
    @Body() body: UpdateQuizAdminDto,
  ): Promise<QuizAdminDto> {
    try {
      const command = new UpdateQuizCommand({
        quizId,
        type: body.type,
        answer: body.answer,
        question: body.question,
        imageFileName: body.imageFileName,
      });

      const quiz = await this.commandBus.execute<UpdateQuizCommand, Quiz>(
        command,
      );

      return QuizDtoAssembler.convertToAdminDto(quiz);
    } catch (error) {
      if (error instanceof QuizNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }
      if (error instanceof QuizImageNotFoundError) {
        throw new BaseHttpException(HttpStatus.BAD_REQUEST, error);
      }

      throw error;
    }
  }
}
