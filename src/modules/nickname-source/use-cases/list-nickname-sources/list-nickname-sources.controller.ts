import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NicknameSourceCollectionDtoAssembler } from '@module/nickname-source/assemblers/nickname-source-dto-collection.assembler';
import { NicknameSourceCollectionAdminDto } from '@module/nickname-source/dto/nickname-source-collection.admin-dto';
import { NicknameSource } from '@module/nickname-source/entities/nickname-source.entity';
import { ListNicknameSourcesAdminDto } from '@module/nickname-source/use-cases/list-nickname-sources/list-nickname-sources.admin-dto';
import { ListNicknameSourcesQuery } from '@module/nickname-source/use-cases/list-nickname-sources/list-nickname-sources.query';

import { OffsetPage } from '@common/base/base.entity';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('nickname-source')
@Controller()
export class ListNicknameSourcesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '닉네임 소스 리스트 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: NicknameSourceCollectionAdminDto })
  @UseGuards(AdminGuard)
  @Get('admin/nickname-sources')
  async listNicknameSources(
    @Query() dto: ListNicknameSourcesAdminDto,
  ): Promise<NicknameSourceCollectionAdminDto> {
    const query = new ListNicknameSourcesQuery({
      page: dto.page,
      perPage: dto.perPage,
    });

    const offsetPage = await this.queryBus.execute<
      ListNicknameSourcesQuery,
      OffsetPage<NicknameSource>
    >(query);

    return NicknameSourceCollectionDtoAssembler.convertToAdminDto(offsetPage);
  }
}
