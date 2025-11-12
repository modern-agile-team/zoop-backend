import { ICommand } from '@nestjs/cqrs';

export interface IUpdateSoundEffectCommandProps {
  soundEffectId: string;
  name?: string;
  description?: string | null;
}

export class UpdateSoundEffectCommand implements ICommand {
  readonly soundEffectId: string;
  readonly name?: string;
  readonly description?: string | null;

  constructor(props: IUpdateSoundEffectCommandProps) {
    this.soundEffectId = props.soundEffectId;
    this.name = props.name;
    this.description = props.description;
  }
}
