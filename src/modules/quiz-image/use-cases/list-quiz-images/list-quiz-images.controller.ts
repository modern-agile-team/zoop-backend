import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuizImageCollectionDtoAssembler } from '@module/quiz-image/assemblers/quiz-image-collection-dto.assembler';
import { QuizImageCollectionAdminDto } from '@module/quiz-image/dto/quiz-image.collection.admin-dto';
import { QuizImage } from '@module/quiz-image/entities/quiz-image.entity';
import { ListQuizImagesAdminDto } from '@module/quiz-image/use-cases/list-quiz-images/list-quiz-images.admin-dto';
import { ListQuizImagesQuery } from '@module/quiz-image/use-cases/list-quiz-images/list-quiz-images.query';

import { OffsetPage } from '@common/base/base.entity';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('quiz-image')
@Controller()
export class ListQuizImagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '퀴즈 이미지 리스트 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: QuizImageCollectionAdminDto })
  @UseGuards(AdminGuard)
  @Get('admin/quiz-images')
  async listQuizImagesAdmin(
    @Query() dto: ListQuizImagesAdminDto,
  ): Promise<QuizImageCollectionAdminDto> {
    const query = new ListQuizImagesQuery({
      category: dto.category,
      sort: dto.sort,
      page: dto.page,
      perPage: dto.perPage,
    });

    const offsetPage = await this.queryBus.execute<
      ListQuizImagesQuery,
      OffsetPage<QuizImage>
    >(query);

    return QuizImageCollectionDtoAssembler.convertToAdminDto(offsetPage);
  }
}
