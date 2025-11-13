import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AvatarDtoAssembler } from '@module/avatar/assemblers/avatar-dto.assembler';
import { AvatarAdminDto } from '@module/avatar/dto/avatar.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { GetAvatarQuery } from '@module/avatar/use-cases/get-avatar/get-avatar.query';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { ParsePositiveIntStringPipe } from '@common/pipes/positive-int-string.pipe';

@ApiTags('avatar')
@Controller()
export class GetAvatarController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '아바타 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [AvatarNotFoundError],
  })
  @ApiOkResponse({ type: AvatarAdminDto })
  @Get('admin/avatars/:avatarId')
  async getAvatar(
    @Param('avatarId', ParsePositiveIntStringPipe) avatarId: string,
  ): Promise<AvatarAdminDto> {
    try {
      const query = new GetAvatarQuery({
        avatarId,
      });

      const avatar = await this.queryBus.execute<GetAvatarQuery, Avatar>(query);

      return AvatarDtoAssembler.convertToAdminDto(avatar);
    } catch (error) {
      if (error instanceof AvatarNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
