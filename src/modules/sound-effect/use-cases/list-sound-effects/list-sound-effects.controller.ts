import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SoundEffectCollectionDtoAssembler } from '@module/sound-effect/assemblers/sound-effect-collection-dto.assembler';
import { SoundEffectCollectionAdminDto } from '@module/sound-effect/dto/sound-effect-collection.admin-dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { ListSoundEffectsAdminQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects-admin.query';
import { ListSoundEffectsAdminDto } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects.admin.dto';

import { OffsetPage } from '@common/base/base.entity';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('sound-effect')
@Controller()
export class ListSoundEffectsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '효과음 리스트 조회' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
  })
  @ApiOkResponse({ type: SoundEffectCollectionAdminDto })
  @Get('admin/sound-effects')
  async listSoundEffectsAdmin(
    @Query() dto: ListSoundEffectsAdminDto,
  ): Promise<SoundEffectCollectionAdminDto> {
    const query = new ListSoundEffectsAdminQuery({
      page: dto.page,
      perPage: dto.perPage,
    });

    const offsetPage = await this.queryBus.execute<
      ListSoundEffectsAdminQuery,
      OffsetPage<SoundEffect>
    >(query);

    return SoundEffectCollectionDtoAssembler.convertToAdminDto(offsetPage);
  }
}
