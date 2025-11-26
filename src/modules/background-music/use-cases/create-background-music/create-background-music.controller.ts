import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { parseBuffer } from 'music-metadata';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

import { BackgroundMusicDtoAssembler } from '@module/background-music/assemblers/background-music-dto.assembler';
import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { CreateBackgroundMusicAdminDto } from '@module/background-music/use-cases/create-background-music/create-background-music-admin.dto';
import { CreateBackgroundMusicCommand } from '@module/background-music/use-cases/create-background-music/create-background-music.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('background-music')
@Controller()
export class CreateBackgroundMusicController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOperation({ summary: '배경 음악 생성' })
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBearerAuth()
  @Post('admin/background-musics')
  async createBackgroundMusic(@Body() dto: CreateBackgroundMusicAdminDto) {
    const metadata = await this.parseMetadata(dto.file);

    const command = new CreateBackgroundMusicCommand({
      durationInSeconds: Math.floor(metadata.format.duration ?? 0),
      originalFileName: dto.file.originalName,
      extension: dto.file.extension,
      contentLength: String(dto.file.size),
      contentType: dto.file.mimeType,
      buffer: dto.file.buffer,
      name: dto.name,
      description: dto.description,
    });

    const result = await this.commandBus.execute<
      CreateBackgroundMusicCommand,
      BackgroundMusic
    >(command);

    return BackgroundMusicDtoAssembler.convertToAdminDto(result);
  }

  private async parseMetadata(file: MemoryStoredFile) {
    try {
      return await parseBuffer(file.buffer, file.mimeType);
    } catch {
      throw new BaseHttpException(
        HttpStatus.BAD_REQUEST,
        new RequestValidationError(),
      );
    }
  }
}
