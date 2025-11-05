import { IQuery } from '@nestjs/cqrs';

export interface IListQuizzesQueryProps {
  imageFileName?: string;
}

export class ListQuizzesQuery implements IQuery {
  readonly imageFileName?: string;

  constructor(props: IListQuizzesQueryProps) {
    this.imageFileName = props.imageFileName;
  }
}
