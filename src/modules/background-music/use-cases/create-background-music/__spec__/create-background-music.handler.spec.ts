import { Test, TestingModule } from '@nestjs/testing';

import { BackgroundMusic } from '@module/background-music/entities/background-music.entity';
import { BackgroundMusicRepositoryModule } from '@module/background-music/repositories/background-music/background-music.repository.module';
import { CreateBackgroundMusicCommandFactory } from '@module/background-music/use-cases/create-background-music/__spec__/create-background-music-command.factory';
import { CreateBackgroundMusicCommand } from '@module/background-music/use-cases/create-background-music/create-background-music.command';
import { CreateBackgroundMusicHandler } from '@module/background-music/use-cases/create-background-music/create-background-music.handler';

import { AppConfigModule } from '@common/app-config/app-config.module';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';
import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(CreateBackgroundMusicHandler.name, () => {
  let handler: CreateBackgroundMusicHandler;

  let awsS3Adapter: AwsS3Port;

  let command: CreateBackgroundMusicCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        BackgroundMusicRepositoryModule,
        AwsS3Module,
        EventStoreModule,
        AppConfigModule,
      ],
      providers: [CreateBackgroundMusicHandler],
    }).compile();

    handler = module.get<CreateBackgroundMusicHandler>(
      CreateBackgroundMusicHandler,
    );

    awsS3Adapter = module.get<AwsS3Port>(AWS_S3_PORT);
  });

  beforeEach(() => {
    command = CreateBackgroundMusicCommandFactory.build();
  });

  beforeEach(() => {
    jest.spyOn(awsS3Adapter, 'uploadFile').mockResolvedValue(undefined);
  });

  describe('배경 음악을 생성하면', () => {
    it('배경 음악이 생성된다', async () => {
      await expect(handler.execute(command)).resolves.toMatchObject<
        Partial<BackgroundMusic>
      >({
        originalFileName: command.originalFileName,
        name: expect.any(String),
        extension: command.extension,
        durationInSeconds: command.durationInSeconds,
        contentLength: command.contentLength,
        contentType: command.contentType,
        description: command.description,
      });
    });
  });
});
