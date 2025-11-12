import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizImageDtoAssembler } from '@module/quiz-image/assemblers/quiz-image-dto.assembler';
import { QuizImageAdminDto } from '@module/quiz-image/dto/quiz-image.admin-dto';
import { QuizImage } from '@module/quiz-image/entities/quiz-image.entity';
import { QuizImageNotFoundError } from '@module/quiz-image/errors/quiz-image-not-found.error';
import { GetQuizImageQuery } from '@module/quiz-image/use-cases/get-quiz-image/get-quiz-image.query';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('quiz-image')
@Controller()
export class GetQuizImageController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '퀴즈 이미지 단건 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [QuizImageNotFoundError],
  })
  @ApiOkResponse({ type: QuizImageAdminDto })
  @Get('admin/quiz-images/:quizImageId')
  async getQuizImage(
    @Param('quizImageId') quizImageId: string,
  ): Promise<QuizImageAdminDto> {
    try {
      const query = new GetQuizImageQuery({
        quizImageId,
      });

      const quizImage = await this.queryBus.execute<
        GetQuizImageQuery,
        QuizImage
      >(query);

      return QuizImageDtoAssembler.convertToAdminDto(quizImage);
    } catch (error) {
      if (error instanceof QuizImageNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
