import { ICommand } from '@nestjs/cqrs';

export interface IUpdateAccountCommandProps {
  accountId: string;
  nickname?: string;
  avatarFileName?: string;
}

export class UpdateAccountCommand implements ICommand {
  readonly accountId: string;
  readonly nickname?: string;
  readonly avatarFileName?: string;

  constructor(props: IUpdateAccountCommandProps) {
    this.accountId = props.accountId;
    this.nickname = props.nickname;
    this.avatarFileName = props.avatarFileName;
  }
}
