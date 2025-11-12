import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { CreateSoundEffectCommand } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.command';

import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(CreateSoundEffectCommand)
export class CreateSoundEffectHandler
  implements ICommandHandler<CreateSoundEffectCommand, unknown>
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
  async execute(command: CreateSoundEffectCommand): Promise<unknown> {
    const soundEffect = SoundEffect.create({
      originalFileName: command.originalFileName,
      name: command.name
        ? command.name
        : command.originalFileName.replace(/\.[^/.]+$/, ''),
      extension: command.extension,
      contentLength: command.contentLength,
      contentType: command.contentType,
      description: command.description,
    });

    await this.soundEffectRepository.insert(soundEffect);

    await this.eventStore.storeAggregateEvents(soundEffect);

    await this.awsS3Adapter.uploadFile({
      file: command.buffer,
      type: 'soundEffect',
      fileName: soundEffect.fileName,
      contentType: soundEffect.contentType,
    });

    return soundEffect;
  }
}
