import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SoundEffectDtoAssembler } from '@module/sound-effect/assemblers/sound-effect-dto.assembler';
import { SoundEffectAdminDto } from '@module/sound-effect/dto/sound-effect-admin.dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { UpdateSoundEffectAdminDto } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.admin-dto';
import { UpdateSoundEffectCommand } from '@module/sound-effect/use-cases/update-sound-effect/update-sound-effect.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('sound-effect')
@Controller()
export class UpdateSoundEffectController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '효과음 수정' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [SoundEffectNotFoundError],
  })
  @ApiOkResponse({ type: SoundEffectAdminDto })
  @Patch('admin/sound-effects/:soundEffectId')
  async updateSoundEffectAdmin(
    @Param('soundEffectId') soundEffectId: string,
    @Body() body: UpdateSoundEffectAdminDto,
  ): Promise<SoundEffectAdminDto> {
    try {
      const query = new UpdateSoundEffectCommand({
        soundEffectId,
        name: body.name,
        description: body.description,
      });

      const soundEffect = await this.commandBus.execute<
        UpdateSoundEffectCommand,
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
