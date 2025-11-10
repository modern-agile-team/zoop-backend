import { IQuery } from '@nestjs/cqrs';

export interface IGetAvatarQueryProps {
  avatarId: string;
}

export class GetAvatarQuery implements IQuery {
  readonly avatarId: string;

  constructor(props: IGetAvatarQueryProps) {
    this.avatarId = props.avatarId;
  }
}
