import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizImageDtoAssembler } from '@module/quiz-image/assemblers/quiz-image-dto.assembler';
import { QuizImageAdminDto } from '@module/quiz-image/dto/quiz-image.admin-dto';
import { QuizImage } from '@module/quiz-image/entities/quiz-image.entity';
import { QuizImageNotFoundError } from '@module/quiz-image/errors/quiz-image-not-found.error';
import { UpdateQuizImageAdminDto } from '@module/quiz-image/use-cases/update-quiz-image/update-quiz-image.admin-dto';
import { UpdateQuizImageCommand } from '@module/quiz-image/use-cases/update-quiz-image/update-quiz-image.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('quiz-image')
@Controller()
export class UpdateQuizImageController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '퀴즈 이미지 수정' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [QuizImageNotFoundError],
  })
  @ApiOkResponse({ type: QuizImageAdminDto })
  @Patch('admin/quiz-images/:quizImageId')
  async updateQuizImageAdmin(
    @Param('quizImageId') quizImageId: string,
    @Body() body: UpdateQuizImageAdminDto,
  ): Promise<QuizImageAdminDto> {
    try {
      const command = new UpdateQuizImageCommand({
        quizImageId,
        name: body.name,
        category: body.category,
      });

      const quizImage = await this.commandBus.execute<
        UpdateQuizImageCommand,
        QuizImage
      >(command);

      return QuizImageDtoAssembler.convertToAdminDto(quizImage);
    } catch (error) {
      if (error instanceof QuizImageNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
