import { IQuery } from '@nestjs/cqrs';

export interface IListBackgroundMusicsAdminQueryProps {
  page?: number;
  perPage?: number;
}

export class ListBackgroundMusicsAdminQuery implements IQuery {
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListBackgroundMusicsAdminQueryProps) {
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
