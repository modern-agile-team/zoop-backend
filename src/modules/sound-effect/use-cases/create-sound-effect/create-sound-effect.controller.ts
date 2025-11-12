import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FormDataRequest } from 'nestjs-form-data';

import { JwtAuthGuard } from '@module/auth/jwt/jwt-auth.guard';
import { SoundEffectDtoAssembler } from '@module/sound-effect/assemblers/sound-effect-dto.assembler';
import { SoundEffectAdminDto } from '@module/sound-effect/dto/sound-effect-admin.dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { CreateSoundEffectCommand } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.command';
import { CreateSoundEffectDto } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.dto';

import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('sound-effect')
@Controller()
export class CreateSoundEffectController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '효과음 생성' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiCreatedResponse({ type: SoundEffectAdminDto })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @FormDataRequest()
  @Post('admin/sound-effects')
  async createSoundEffectAdmin(@Body() dto: CreateSoundEffectDto) {
    const command = new CreateSoundEffectCommand({
      name: dto.name,
      description: dto.description,
      buffer: dto.file.buffer,
      originalFileName: Buffer.from(dto.file.originalName, 'ascii').toString(
        'utf8',
      ),
      extension: dto.file.extension,
      contentLength: String(dto.file.size),
      contentType: dto.file.mimeType,
    });

    const soundEffect = await this.commandBus.execute<
      CreateSoundEffectCommand,
      SoundEffect
    >(command);

    return SoundEffectDtoAssembler.convertToAdminDto(soundEffect);
  }
}
