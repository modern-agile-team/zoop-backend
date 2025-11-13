import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AvatarCollectionDtoAssembler } from '@module/avatar/assemblers/avatar-dto-collection.assembler';
import { AvatarCollectionAdminDto } from '@module/avatar/dto/avatar-collection.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { ListAvatarsAdminDto } from '@module/avatar/use-cases/list-avatars/list-avatars.admin-dto';
import { ListAvatarsQuery } from '@module/avatar/use-cases/list-avatars/list-avatars.query';

import { OffsetPage } from '@common/base/base.entity';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('avatar')
@Controller()
export class ListAvatarsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '아바타 리스트 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: AvatarCollectionAdminDto })
  @Get('admin/avatars')
  async listAvatars(
    @Query() dto: ListAvatarsAdminDto,
  ): Promise<AvatarCollectionAdminDto> {
    const query = new ListAvatarsQuery({
      page: dto.page,
      perPage: dto.perPage,
    });

    const offsetPage = await this.queryBus.execute<
      ListAvatarsQuery,
      OffsetPage<Avatar>
    >(query);

    return AvatarCollectionDtoAssembler.convertToAdminDto(offsetPage);
  }
}
