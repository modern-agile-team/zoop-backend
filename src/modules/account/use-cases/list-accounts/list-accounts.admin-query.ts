import { IQuery } from '@nestjs/cqrs';

export interface IListAccountsAdminQueryProps {
  avatarFileName?: string;
  page?: number;
  perPage?: number;
}

export class ListAccountsAdminQuery implements IQuery {
  readonly avatarFileName?: string;
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListAccountsAdminQueryProps) {
    this.avatarFileName = props.avatarFileName;
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
