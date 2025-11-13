import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SoundEffectDtoAssembler } from '@module/sound-effect/assemblers/sound-effect-dto.assembler';
import { SoundEffectAdminDto } from '@module/sound-effect/dto/sound-effect-admin.dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { GetSoundEffectQuery } from '@module/sound-effect/use-cases/get-sound-effect/get-sound-effect.query';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('sound-effect')
@Controller()
export class GetSoundEffectController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '효과음 단일 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [SoundEffectNotFoundError],
  })
  @ApiOkResponse({ type: SoundEffectAdminDto })
  @Get('admin/sound-effects/:soundEffectId')
  async getSoundEffect(
    @Param('soundEffectId') soundEffectId: string,
  ): Promise<SoundEffectAdminDto> {
    try {
      const query = new GetSoundEffectQuery({
        soundEffectId,
      });

      const soundEffect = await this.queryBus.execute<
        GetSoundEffectQuery,
        SoundEffect
      >(query);

      return SoundEffectDtoAssembler.convertToAdminDto(soundEffect);
    } catch (error) {
      if (error instanceof SoundEffectNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
