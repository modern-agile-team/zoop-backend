import { Test, TestingModule } from '@nestjs/testing';

import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';
import {
  AVATAR_REPOSITORY,
  AvatarRepositoryPort,
} from '@module/avatar/repositories/avatar/avatar.repository.port';
import { CreateAvatarCommandFactory } from '@module/avatar/use-cases/create-avatar/__spec__/create-avatar-command.factory';
import { CreateAvatarCommand } from '@module/avatar/use-cases/create-avatar/create-avatar.command';
import { CreateAvatarHandler } from '@module/avatar/use-cases/create-avatar/create-avatar.handler';

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

describe(CreateAvatarHandler.name, () => {
  let handler: CreateAvatarHandler;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let avatarRepository: AvatarRepositoryPort;
  let awsS3Adapter: AwsS3Port;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let appConfigService: AppConfigService;

  let command: CreateAvatarCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        AvatarRepositoryModule,
        AwsS3Module,
        EventStoreModule,
        AppConfigModule,
      ],
      providers: [CreateAvatarHandler],
    }).compile();

    handler = module.get<CreateAvatarHandler>(CreateAvatarHandler);

    avatarRepository = module.get<AvatarRepositoryPort>(AVATAR_REPOSITORY);
    awsS3Adapter = module.get<AwsS3Port>(AWS_S3_PORT);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = CreateAvatarCommandFactory.build();
  });

  beforeEach(() => {
    jest.spyOn(awsS3Adapter, 'uploadFile').mockResolvedValue(undefined);
  });

  describe('아바타를 생성하면', () => {
    it('아바타가 생성된다', async () => {
      await expect(handler.execute(command)).resolves.toMatchObject<
        Partial<Avatar>
      >({
        originalFileName: command.originalFileName,
        name: expect.any(String),
        extension: command.extension,
        contentLength: command.contentLength,
        width: command.width,
        height: command.height,
        description: command.description,
      });
    });
  });
});
