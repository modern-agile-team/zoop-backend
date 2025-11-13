import { IQuery } from '@nestjs/cqrs';

export interface IListAvatarsQueryProps {
  page?: number;
  perPage?: number;
}

export class ListAvatarsQuery implements IQuery {
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListAvatarsQueryProps) {
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
