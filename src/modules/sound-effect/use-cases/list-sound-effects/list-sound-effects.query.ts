import { IQuery } from '@nestjs/cqrs';

export interface IListSoundEffectsQueryProps {}

export class ListSoundEffectsQuery implements IQuery {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(props: IListSoundEffectsQueryProps) {}
}
