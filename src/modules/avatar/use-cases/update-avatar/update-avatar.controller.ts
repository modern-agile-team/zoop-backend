import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AvatarDtoAssembler } from '@module/avatar/assemblers/avatar-dto.assembler';
import { AvatarAdminDto } from '@module/avatar/dto/avatar.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarNotFoundError } from '@module/avatar/errors/avatar-not-found.error';
import { UpdateAvatarAdminDto } from '@module/avatar/use-cases/update-avatar/update-avatar.admin-dto';
import { UpdateAvatarCommand } from '@module/avatar/use-cases/update-avatar/update-avatar.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('avatar')
@Controller()
export class UpdateAvatarController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '아바타 수정' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [AvatarNotFoundError],
  })
  @ApiOkResponse({ type: AvatarAdminDto })
  @Patch('admin/avatars/:avatarId')
  async updateAvatar(
    @Param('avatarId') avatarId: string,
    @Body() dto: UpdateAvatarAdminDto,
  ): Promise<AvatarAdminDto> {
    try {
      const command = new UpdateAvatarCommand({
        avatarId,
        name: dto.name,
        description: dto.description,
      });

      const avatar = await this.commandBus.execute<UpdateAvatarCommand, Avatar>(
        command,
      );

      return AvatarDtoAssembler.convertToAdminDto(avatar);
    } catch (error) {
      if (error instanceof AvatarNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
