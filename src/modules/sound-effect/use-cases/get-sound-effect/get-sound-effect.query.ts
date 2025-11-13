import { IQuery } from '@nestjs/cqrs';

export interface IGetSoundEffectQueryProps {
  soundEffectId: string;
}

export class GetSoundEffectQuery implements IQuery {
  readonly soundEffectId: string;

  constructor(props: IGetSoundEffectQueryProps) {
    this.soundEffectId = props.soundEffectId;
  }
}
