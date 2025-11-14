import { ApiProperty } from '@nestjs/swagger';

import { SoundEffectDto } from '@module/sound-effect/dto/sound-effect.dto';

export class SoundEffectCollectionDto {
  @ApiProperty({
    type: [SoundEffectDto],
  })
  data: SoundEffectDto[];
}
