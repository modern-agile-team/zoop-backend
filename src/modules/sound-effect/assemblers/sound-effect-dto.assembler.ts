import { SoundEffectAdminDto } from '@module/sound-effect/dto/sound-effect-admin.dto';
import { SoundEffectDto } from '@module/sound-effect/dto/sound-effect.dto';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';

import { AssetUrlManager } from '@shared/asset/asset-url.manager';

export class SoundEffectDtoAssembler {
  static convertToDto(soundEffect: SoundEffect): SoundEffectDto {
    const dto = new SoundEffectDto({
      id: soundEffect.id,
      createdAt: soundEffect.createdAt,
      updatedAt: soundEffect.updatedAt,
    });

    dto.name = soundEffect.name;
    dto.originalFileName = soundEffect.originalFileName;
    dto.soundEffectFileName = soundEffect.fileName;
    dto.soundEffectUrl = AssetUrlManager.fileNameToUrl(
      soundEffect.fileName,
      'soundEffect',
    );
    dto.extension = soundEffect.extension;
    dto.contentType = soundEffect.contentType;
    dto.contentLength = Number(soundEffect.contentLength);
    dto.description = soundEffect.description ?? null;

    return dto;
  }

  static convertToAdminDto(soundEffect: SoundEffect): SoundEffectAdminDto {
    const dto = new SoundEffectAdminDto({
      id: soundEffect.id,
      createdAt: soundEffect.createdAt,
      updatedAt: soundEffect.updatedAt,
    });

    dto.name = soundEffect.name;
    dto.originalFileName = soundEffect.originalFileName;
    dto.soundEffectFileName = soundEffect.fileName;
    dto.soundEffectUrl = AssetUrlManager.fileNameToUrl(
      soundEffect.fileName,
      'soundEffect',
    );
    dto.extension = soundEffect.extension;
    dto.contentType = soundEffect.contentType;
    dto.contentLength = Number(soundEffect.contentLength);
    dto.description = soundEffect.description ?? null;

    return dto;
  }
}
