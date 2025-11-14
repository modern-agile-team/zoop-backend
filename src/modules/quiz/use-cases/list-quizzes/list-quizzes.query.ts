import { IQuery } from '@nestjs/cqrs';

export interface IListQuizzesQueryProps {
  imageFileName?: string;
  page?: number;
  perPage?: number;
}

export class ListQuizzesQuery implements IQuery {
  readonly imageFileName?: string;
  readonly page?: number;
  readonly perPage?: number;

  constructor(props: IListQuizzesQueryProps) {
    this.imageFileName = props.imageFileName;
    this.page = props.page;
    this.perPage = props.perPage;
  }
}
