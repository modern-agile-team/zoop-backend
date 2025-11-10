import { ICommand } from '@nestjs/cqrs';

export interface IUpdateAvatarCommandProps {
  avatarId: string;
  name?: string;
  description?: string | null;
}

export class UpdateAvatarCommand implements ICommand {
  readonly avatarId: string;
  readonly name?: string;
  readonly description?: string | null;

  constructor(props: IUpdateAvatarCommandProps) {
    this.avatarId = props.avatarId;
    this.name = props.name;
    this.description = props.description;
  }
}
