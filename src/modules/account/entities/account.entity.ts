import { AccountCreatedEvent } from '@module/account/events/account-created-event/account-created.event';
import { AccountEnteredEvent } from '@module/account/events/account-entered-event/account-entered.event';
import { AccountSignedInEvent } from '@module/account/events/account-signed-in-event/account-signed-in.event';
import { AccountUpdatedEvent } from '@module/account/events/account-updated-event/account-updated.event';

import {
  AggregateRoot,
  CreateEntityProps,
  generateEntityId,
} from '@common/base/base.entity';

export enum AccountRole {
  admin = 'admin',
  user = 'user',
}

export enum SignInType {
  username = 'username',
  google = 'google',
}

export enum SocialProvider {
  google = 'google',
}

export interface AccountProps {
  role: AccountRole;
  signInType: SignInType;
  socialProvider: SocialProvider | null;
  socialProviderUid: string | null;
  username: string | null;
  password: string | null;
  nickname: string;
  avatarFileName: string;
  enteredAt: Date | null;
  leftAt: Date | null;
  isActive: boolean;
  lastSignedInAt: Date | null;
}

interface CreateAccountWithUsernameProps {
  role: AccountRole;
  signInType: SignInType;
  nickname: string;
  avatarFileName: string;
  username: string;
  password: string;
}

interface CreateAccountWithGoogleProps {
  role: AccountRole;
  socialProviderUid?: string;
  nickname: string;
  avatarFileName: string;
}

interface UpdateAccountProps {
  nickname?: string;
  avatarFileName?: string;
}

export class Account extends AggregateRoot<AccountProps> {
  constructor(props: CreateEntityProps<AccountProps>) {
    super(props);
  }

  static createWithUsername(props: CreateAccountWithUsernameProps) {
    const id = generateEntityId();
    const date = new Date();

    const account = new Account({
      id,
      props: {
        role: props.role,
        signInType: props.signInType,
        socialProvider: null,
        socialProviderUid: null,
        username: props.username,
        password: props.password,
        nickname: props.nickname,
        avatarFileName: props.avatarFileName,
        isActive: false,
        enteredAt: null,
        leftAt: null,
        lastSignedInAt: null,
      },
      createdAt: date,
      updatedAt: date,
    });

    account.apply(
      new AccountCreatedEvent(account.id, {
        role: props.role,
        signInType: props.signInType,
        username: props.username,
        password: props.password,
        nickname: account.props.nickname,
        avatarFileName: props.avatarFileName,
      }),
    );

    return account;
  }

  static createAccountWithGoogle(props: CreateAccountWithGoogleProps) {
    const id = generateEntityId();
    const date = new Date();

    const account = new Account({
      id,
      props: {
        role: props.role,
        signInType: SignInType.google,
        socialProvider: SocialProvider.google,
        socialProviderUid: props.socialProviderUid ?? null,
        nickname: props.nickname,
        avatarFileName: props.avatarFileName,
        isActive: false,
        username: null,
        password: null,
        enteredAt: null,
        leftAt: null,
        lastSignedInAt: null,
      },
      createdAt: date,
      updatedAt: date,
    });

    account.apply(
      new AccountCreatedEvent(account.id, {
        role: AccountRole.user,
        signInType: SignInType.google,
        socialProvider: SocialProvider.google,
        socialProviderUid: props.socialProviderUid,
        nickname: account.props.nickname,
        avatarFileName: props.avatarFileName,
      }),
    );

    return account;
  }

  public validate(): void {}

  get role(): AccountRole {
    return this.props.role;
  }

  get signInType(): SignInType {
    return this.props.signInType;
  }

  get socialProvider(): SocialProvider | null {
    return this.props.socialProvider;
  }

  get socialProviderUid(): string | null {
    return this.props.socialProviderUid;
  }

  get username(): string | null {
    return this.props.username;
  }

  get password(): string | null {
    return this.props.password;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get avatarFileName(): string {
    return this.props.avatarFileName;
  }

  get enteredAt(): Date | null {
    return this.props.enteredAt;
  }

  get leftAt(): Date | null {
    return this.props.leftAt;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastSignedInAt(): Date | null {
    return this.props.lastSignedInAt;
  }

  enter() {
    const now = new Date();

    this.props.enteredAt = now;
    this.props.isActive = true;

    this.updatedAt = now;

    this.apply(
      new AccountEnteredEvent(this.id, {
        nickname: this.props.nickname,
        enteredAt: now,
      }),
    );
  }

  signIn() {
    const now = new Date();

    this.props.lastSignedInAt = now;

    this.updatedAt = now;

    this.apply(new AccountSignedInEvent(this.id, { signedInAt: now }));
  }

  update(props: UpdateAccountProps) {
    if (props.nickname !== undefined) {
      this.props.nickname = props.nickname;
    }

    if (props.avatarFileName !== undefined) {
      this.props.avatarFileName = props.avatarFileName;
    }

    this.updatedAt = new Date();

    this.apply(
      new AccountUpdatedEvent(this.id, {
        nickname: this.props.nickname,
        avatarFileName: this.props.avatarFileName,
      }),
    );
  }
}
