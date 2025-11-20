import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@nestjs-cls/transactional';

import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import {
  BACKGROUND_MUSIC_REPOSITORY,
  BackgroundMusicRepositoryPort,
} from '@module/background-music/repositories/background-music/background-music.repository.port';
import { CreateBackgroundMusicCommand } from '@module/background-music/use-cases/create-background-music/create-background-music.command';

import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';

@CommandHandler(CreateBackgroundMusicCommand)
export class CreateBackgroundMusicHandler
  implements ICommandHandler<CreateBackgroundMusicCommand, BackgroundMusic>
{
  constructor(
    @Inject(BACKGROUND_MUSIC_REPOSITORY)
    private readonly backgroundMusicRepository: BackgroundMusicRepositoryPort,
    @Inject(AWS_S3_PORT)
    private readonly awsS3Adapter: AwsS3Port,
    @Inject(EVENT_STORE)
    private readonly eventStore: IEventStore,
  ) {}

  @Transactional()
  async execute(
    command: CreateBackgroundMusicCommand,
  ): Promise<BackgroundMusic> {
    const backgroundMusic = BackgroundMusic.create({
      originalFileName: command.originalFileName,
      durationInSeconds: command.durationInSeconds,
      name: command.name
        ? command.name
        : command.originalFileName.replace(/\.[^/.]+$/, ''),
      extension: command.extension,
      contentLength: command.contentLength,
      contentType: command.contentType,
      description: command.description,
    });

    await this.backgroundMusicRepository.insert(backgroundMusic);

    await this.eventStore.storeAggregateEvents(backgroundMusic);

    await this.awsS3Adapter.uploadFile({
      file: command.buffer,
      type: 'backgroundMusic',
      fileName: backgroundMusic.fileName,
      contentType: backgroundMusic.contentType,
    });

    return backgroundMusic;
  }
}
