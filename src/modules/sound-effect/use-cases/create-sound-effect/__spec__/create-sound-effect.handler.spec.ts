import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { CreateSoundEffectCommandFactory } from '@module/sound-effect/use-cases/create-sound-effect/__spec__/create-sound-effect-command.factory';
import { CreateSoundEffectCommand } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.command';
import { CreateSoundEffectHandler } from '@module/sound-effect/use-cases/create-sound-effect/create-sound-effect.handler';

import { AppConfigModule } from '@common/app-config/app-config.module';
import { AppConfigService } from '@common/app-config/app-config.service';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';
import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(CreateSoundEffectHandler.name, () => {
  let handler: CreateSoundEffectHandler;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let soundEffectRepository: SoundEffectRepositoryPort;
  let awsS3Adapter: AwsS3Port;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let appConfigService: AppConfigService;

  let command: CreateSoundEffectCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        SoundEffectRepositoryModule,
        AwsS3Module,
        EventStoreModule,
        AppConfigModule,
      ],
      providers: [CreateSoundEffectHandler],
    }).compile();

    handler = module.get<CreateSoundEffectHandler>(CreateSoundEffectHandler);

    soundEffectRepository = module.get<SoundEffectRepositoryPort>(
      SOUND_EFFECT_REPOSITORY,
    );
    awsS3Adapter = module.get<AwsS3Port>(AWS_S3_PORT);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = CreateSoundEffectCommandFactory.build();
  });

  beforeEach(() => {
    jest.spyOn(awsS3Adapter, 'uploadFile').mockResolvedValue(undefined);
  });

  describe('효과음을 생성하면', () => {
    it('효과음이 생성된다', async () => {
      await expect(handler.execute(command)).resolves.toMatchObject<
        Partial<SoundEffect>
      >({
        originalFileName: command.originalFileName,
        name: expect.any(String),
        extension: command.extension,
        contentLength: command.contentLength,
        contentType: command.contentType,
        description: command.description,
      });
    });
  });
});
