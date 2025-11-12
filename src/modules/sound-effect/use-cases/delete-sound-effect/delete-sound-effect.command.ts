import { ICommand } from '@nestjs/cqrs';

export interface IDeleteSoundEffectCommandProps {
  soundEffectId: string;
}

export class DeleteSoundEffectCommand implements ICommand {
  readonly soundEffectId: string;

  constructor(props: IDeleteSoundEffectCommandProps) {
    this.soundEffectId = props.soundEffectId;
  }
}
