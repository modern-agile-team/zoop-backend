import { Test, TestingModule } from '@nestjs/testing';

import { AccountFactory } from '@module/account/entities/__spec__/account.factory';
import { SocialProvider } from '@module/account/entities/account.entity';
import { SocialAccountAlreadyExistsError } from '@module/account/errors/social-account-already-exists.error';
import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import {
  ACCOUNT_REPOSITORY,
  AccountRepositoryPort,
} from '@module/account/repositories/account/account.repository.port';
import { CreateAccountWithGoogleCommandFactory } from '@module/account/use-cases/create-account-with-google/__spec__/create-account-with-google-command.factory';
import { CreateAccountWithGoogleCommand } from '@module/account/use-cases/create-account-with-google/create-account-with-google.command';
import { CreateAccountWithGoogleHandler } from '@module/account/use-cases/create-account-with-google/create-account-with-google.handler';
import { AvatarFactory } from '@module/avatar/entities/__spec__/avatar.factory';
import { Avatar } from '@module/avatar/entities/avatar.entity';
import { AvatarService } from '@module/avatar/services/avatar-service/avatar.service';
import { AVATAR_SERVICE } from '@module/avatar/services/avatar-service/avatar.service.interface';
import { AvatarServiceModule } from '@module/avatar/services/avatar-service/avatar.service.module';
import { NicknameSourceFactory } from '@module/nickname-source/entities/__spec__/nickname-source.factory';
import { NicknameSource } from '@module/nickname-source/entities/nickname-source.entity';
import {
  INicknameSourceService,
  NICKNAME_SOURCE_SERVICE,
} from '@module/nickname-source/services/nickname-source-service/nickname-source.service.interface';
import { NicknameSourceServiceModule } from '@module/nickname-source/services/nickname-source-service/nickname-source.service.module';

import { ClsModuleFactory } from '@common/factories/cls-module.factory';

import {
  EVENT_STORE,
  IEventStore,
} from '@core/event-sourcing/event-store.interface';
import { EventStoreModule } from '@core/event-sourcing/event-store.module';

describe(CreateAccountWithGoogleHandler.name, () => {
  let handler: CreateAccountWithGoogleHandler;

  let accountRepository: AccountRepositoryPort;
  let nicknameSourceService: INicknameSourceService;
  let avatarService: AvatarService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventStore: IEventStore;

  let command: CreateAccountWithGoogleCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClsModuleFactory(),
        AccountRepositoryModule,
        NicknameSourceServiceModule,
        AvatarServiceModule,
        EventStoreModule,
      ],
      providers: [CreateAccountWithGoogleHandler],
    }).compile();

    handler = module.get<CreateAccountWithGoogleHandler>(
      CreateAccountWithGoogleHandler,
    );

    accountRepository = module.get<AccountRepositoryPort>(ACCOUNT_REPOSITORY);
    nicknameSourceService = module.get<INicknameSourceService>(
      NICKNAME_SOURCE_SERVICE,
    );
    avatarService = module.get<AvatarService>(AVATAR_SERVICE);
    eventStore = module.get<IEventStore>(EVENT_STORE);
  });

  beforeEach(() => {
    command = CreateAccountWithGoogleCommandFactory.build();
  });

  let nicknameSource: NicknameSource;
  let avatar: Avatar;
  beforeEach(() => {
    nicknameSource = NicknameSourceFactory.build();
    avatar = AvatarFactory.build();

    jest
      .spyOn(nicknameSourceService, 'issueNickname')
      .mockResolvedValue(nicknameSource);

    jest
      .spyOn(avatarService, 'assignRandomAvatar')
      .mockResolvedValue({ avatarFileName: avatar.fileName });
  });

  describe('구글 로그인을 사용하여 계정을 생성하면', () => {
    it('계정을 생성해야한다.', async () => {
      await expect(handler.execute(command)).resolves.toEqual(
        expect.objectContaining({
          role: command.role,
          nickname: nicknameSource.fullname,
          avatarFileName: avatar.fileName,
          socialProviderUid: command.socialProviderUid,
          socialProvider: SocialProvider.google,
        }),
      );
    });
  });

  describe('이미 구글 로그인을 통한 계정이 존재하는 경우', () => {
    beforeEach(async () => {
      await accountRepository.insert(
        AccountFactory.build({
          socialProvider: SocialProvider.google,
          socialProviderUid: command.socialProviderUid,
        }),
      );
    });

    it('이미 소셜 계정이 존재한다는 에러가 발생해야한다.', async () => {
      await expect(handler.execute(command)).rejects.toThrow(
        SocialAccountAlreadyExistsError,
      );
    });
  });
});
