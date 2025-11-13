import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AvatarInUsedError } from '@module/avatar/errors/avatar-in-used.error';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { DeleteAvatarCommand } from '@module/avatar/use-cases/delete-avatar/delete-avatar.command';

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
export class DeleteAvatarController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '아바타 삭제' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [AvatarNotFoundError],
    [HttpStatus.CONFLICT]: [AvatarInUsedError],
  })
  @ApiNoContentResponse({})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/avatars/:avatarId')
  async deleteAvatarAdmin(
    @Param('avatarId', ParsePositiveIntStringPipe) avatarId: string,
  ): Promise<void> {
    try {
      const command = new DeleteAvatarCommand({
        avatarId,
      });

      await this.commandBus.execute<DeleteAvatarCommand, void>(command);
    } catch (error) {
      if (error instanceof AvatarNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      if (error instanceof AvatarInUsedError) {
        throw new BaseHttpException(HttpStatus.CONFLICT, error);
      }

      throw error;
    }
  }
}
