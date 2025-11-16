import { IQuery } from '@nestjs/cqrs';

export interface IListSoundEffectsAdminQueryProps {
  page?: number;
  perPage?: number;
}

export class ListSoundEffectsAdminQuery implements IQuery {
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListSoundEffectsAdminQueryProps) {
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
