import { Test, TestingModule } from '@nestjs/testing';

import { SoundEffectFactory } from '@module/sound-effect/entities/__spec__/sound-effect.factory';
import { SoundEffect } from '@module/sound-effect/entities/sound-effect.entity';
import { SoundEffectNotFoundError } from '@module/sound-effect/errors/sound-effect-not-found.error';
import { SoundEffectRepositoryModule } from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.module';
import {
  SOUND_EFFECT_REPOSITORY,
  SoundEffectRepositoryPort,
} from '@module/sound-effect/repositories/sound-effect/sound-effect.repository.port';
import { DeleteSoundEffectCommandFactory } from '@module/sound-effect/use-cases/delete-sound-effect/__spec__/delete-sound-effect-command.factory';
import { DeleteSoundEffectCommand } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.command';
import { DeleteSoundEffectHandler } from '@module/sound-effect/use-cases/delete-sound-effect/delete-sound-effect.handler';

import { AppConfigModule } from '@common/app-config/app-config.module';
import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import { AwsS3Module } from '@shared/services/aws-s3/aws-s3.module';
import { AWS_S3_PORT, AwsS3Port } from '@shared/services/aws-s3/aws-s3.port';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(DeleteSoundEffectHandler.name, () => {
  let handler: DeleteSoundEffectHandler;

  let soundEffectRepository: SoundEffectRepositoryPort;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let awsS3Adapter: AwsS3Port;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: DeleteSoundEffectCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        SoundEffectRepositoryModule,
        AwsS3Module,
        EventStoreModule,
        AppConfigModule,
      ],
      providers: [DeleteSoundEffectHandler],
    }).compile();

    handler = module.get<DeleteSoundEffectHandler>(DeleteSoundEffectHandler);

    soundEffectRepository = module.get<SoundEffectRepositoryPort>(
      SOUND_EFFECT_REPOSITORY,
    );
    awsS3Adapter = module.get<AwsS3Port>(AWS_S3_PORT);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = DeleteSoundEffectCommandFactory.build();
  });

  beforeEach(() => {
    jest.spyOn(awsS3Adapter, 'deleteFile').mockResolvedValue(undefined);
  });

  describe('효과음이 삭제하면 ', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let soundEffect: SoundEffect;

    beforeEach(async () => {
      soundEffect = await soundEffectRepository.insert(
        SoundEffectFactory.build({ id: command.soundEffectId }),
      );
    });

    it('효과음이 삭제돼야한다.', async () => {
      await expect(handler.execute(command)).resolves.toBeUndefined();

      await expect(
        soundEffectRepository.findOneById(command.soundEffectId),
      ).resolves.toBeUndefined();
    });
  });

  describe('효과음이 존재하지 않는 경우', () => {
    it('효과음이 존재하지 않는다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(
        SoundEffectNotFoundError,
      );
    });
  });
});
