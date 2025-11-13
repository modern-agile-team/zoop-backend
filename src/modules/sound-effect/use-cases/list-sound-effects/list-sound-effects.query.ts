import { IQuery } from '@nestjs/cqrs';

export interface IListSoundEffectsQueryProps {
  page?: number;
  perPage?: number;
}

export class ListSoundEffectsQuery implements IQuery {
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListSoundEffectsQueryProps) {
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
