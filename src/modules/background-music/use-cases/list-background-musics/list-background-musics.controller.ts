import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BackgroundMusicCollectionDtoAssembler } from '@module/background-music/assemblers/background-music-collection-dto.assembler';
import { BackgroundMusicCollectionAdminDto } from '@module/background-music/dto/background-music-collection.admin-dto';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { ListBackgroundMusicsAdminDto } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-dto';
import { ListBackgroundMusicsAdminQuery } from '@module/background-music/use-cases/list-background-musics/list-background-musics.admin-query';

import { OffsetPage } from '@common/base/base.entity';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('background-music')
@Controller()
export class ListBackgroundMusicsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '효과음 리스트 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: BackgroundMusicCollectionAdminDto })
  @Get('admin/background-musics')
  async listBackgroundMusicsAdmin(
    @Query() dto: ListBackgroundMusicsAdminDto,
  ): Promise<BackgroundMusicCollectionAdminDto> {
    const query = new ListBackgroundMusicsAdminQuery({
      page: dto.page,
      perPage: dto.perPage,
    });

    const offsetPage = await this.queryBus.execute<
      ListBackgroundMusicsAdminQuery,
      OffsetPage<BackgroundMusic>
    >(query);

    return BackgroundMusicCollectionDtoAssembler.convertToAdminDto(offsetPage);
  }
}
