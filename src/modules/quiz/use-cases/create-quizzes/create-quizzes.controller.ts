import {
  Body,
  Controller,
  HttpStatus,
  ParseArrayPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizDtoAssembler } from '@module/quiz/assemblers/quiz-dto.assembler';
import { QuizAdminDto } from '@module/quiz/dto/quiz.admin-dto';
import { Quiz } from '@module/quiz/entities/quiz.entity';
import { CreateQuizzesAdminDto } from '@module/quiz/use-cases/create-quizzes/create-quizzes.admin-dto';
import { CreateQuizzesCommand } from '@module/quiz/use-cases/create-quizzes/create-quizzes.command';

import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('quiz')
@Controller()
export class CreateQuizzesController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '퀴즈 대량 생성' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: [QuizAdminDto] })
  @ApiBody({ type: [CreateQuizzesAdminDto] })
  @UseGuards(AdminGuard)
  @Put('admin/quizzes')
  async createQuizzesAdmin(
    @Body(new ParseArrayPipe({ items: CreateQuizzesAdminDto }))
    dtos: CreateQuizzesAdminDto[],
  ): Promise<QuizAdminDto[]> {
    const command = new CreateQuizzesCommand(
      dtos.map((dto) => ({
        type: dto.type,
        answer: dto.answer,
        question: dto.question,
        imageFileName: dto.imageFileName,
      })),
    );

    const quizzes = await this.commandBus.execute<CreateQuizzesCommand, Quiz[]>(
      command,
    );

    return quizzes.map((quiz) => QuizDtoAssembler.convertToAdminDto(quiz));
  }
}
