import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import imageSize from 'image-size';
import { FormDataRequest } from 'nestjs-form-data';

import { JwtAuthGuard } from '@module/auth/jwt/jwt-auth.guard';
import { AvatarDtoAssembler } from '@module/avatar/assemblers/avatar-dto.assembler';
import { AvatarAdminDto } from '@module/avatar/dto/avatar.admin-dto';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { CreateAvatarCommand } from '@module/avatar/use-cases/create-avatar/create-avatar.command';
import { CreateAvatarDto } from '@module/avatar/use-cases/create-avatar/create-avatar.dto';

import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('avatar')
@Controller()
export class CreateAvatarController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '아바타 생성' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiCreatedResponse({ type: AvatarAdminDto })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @FormDataRequest()
  @Post('admin/avatars')
  async createAvatarAdmin(@Body() dto: CreateAvatarDto) {
    const avatarImageDimensions = imageSize(dto.file.buffer);

    const command = new CreateAvatarCommand({
      name: dto.name,
      description: dto.description,
      buffer: dto.file.buffer,
      originalFileName: Buffer.from(dto.file.originalName, 'ascii').toString(
        'utf8',
      ),
      extension: avatarImageDimensions.type as string,
      contentLength: String(dto.file.size),
      contentType: dto.file.mimeType,
      width: avatarImageDimensions.width,
      height: avatarImageDimensions.height,
    });

    const avatar = await this.commandBus.execute<CreateAvatarCommand, Avatar>(
      command,
    );

    return AvatarDtoAssembler.convertToAdminDto(avatar);
  }
}
