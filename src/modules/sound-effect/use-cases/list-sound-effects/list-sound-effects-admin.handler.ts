import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { ListSoundEffectsAdminQuery } from '@module/sound-effect/use-cases/list-sound-effects/list-sound-effects-admin.query';

import { OffsetPage } from '@common/base/base.entity';

@QueryHandler(ListSoundEffectsAdminQuery)
export class ListSoundEffectsAdminHandler
  implements IQueryHandler<ListSoundEffectsAdminQuery, OffsetPage<SoundEffect>>
{
  constructor(
    @Inject(SOUND_EFFECT_REPOSITORY)
    private readonly soundEffectRepository: SoundEffectRepositoryPort,
  ) {}

  async execute(
    query: ListSoundEffectsAdminQuery,
  ): Promise<OffsetPage<SoundEffect>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;

    const result = await this.soundEffectRepository.findAllOffsetPaginated({
      pageInfo: {
        offset: (page - 1) * perPage,
        limit: perPage,
      },
    });

    return new OffsetPage(result.data, page, perPage, result.totalCount);
  }
}
