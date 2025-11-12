import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { DeleteSoundEffectCommand } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.command';

import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(DeleteSoundEffectCommand)
export class DeleteSoundEffectHandler
  implements ICommandHandler<DeleteSoundEffectCommand, void>
{
  constructor(
    @Inject(SOUND_EFFECT_REPOSITORY)
    private readonly soundEffectRepository: SoundEffectRepositoryPort,
    @Inject(AWS_S3_PORT)
    private readonly awsS3Adapter: AwsS3Port,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async execute(command: DeleteSoundEffectCommand): Promise<void> {
    const soundEffect = await this.soundEffectRepository.findOneById(
      command.soundEffectId,
    );

    if (soundEffect === undefined) {
      throw new SoundEffectNotFoundError();
    }

    soundEffect.delete();

    await this.soundEffectRepository.delete(soundEffect);

    await this.eventStore.storeAggregateEvents(soundEffect);

    await this.awsS3Adapter.deleteFile({
      type: 'soundEffect',
      fileName: soundEffect.fileName,
    });
  }
}
