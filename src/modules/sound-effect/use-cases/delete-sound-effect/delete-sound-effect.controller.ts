import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { DeleteSoundEffectCommand } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { ParsePositiveIntStringPipe } from '@common/pipes/positive-int-string.pipe';

@ApiTags('sound-effect')
@Controller()
export class DeleteSoundEffectController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '효과음 삭제' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.NOT_FOUND]: [SoundEffectNotFoundError],
  })
  @ApiNoContentResponse({})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/sound-effects/:soundEffectId')
  async deleteSoundEffectAdmin(
    @Param('soundEffectId', ParsePositiveIntStringPipe) soundEffectId: string,
  ): Promise<void> {
    try {
      const command = new DeleteSoundEffectCommand({
        soundEffectId,
      });

      await this.commandBus.execute<DeleteSoundEffectCommand, void>(command);
    } catch (error) {
      if (error instanceof SoundEffectNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      throw error;
    }
  }
}
