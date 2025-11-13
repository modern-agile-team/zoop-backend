import { ICommand } from '@nestjs/cqrs';

export interface IDeleteAvatarCommandProps {
  avatarId: string;
}

export class DeleteAvatarCommand implements ICommand {
  readonly avatarId: string;

  constructor(props: IDeleteAvatarCommandProps) {
    this.avatarId = props.avatarId;
  }
}
