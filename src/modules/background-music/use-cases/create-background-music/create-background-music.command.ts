import { ICommand } from '@nestjs/cqrs';

export interface ICreateBackgroundMusicCommandProps {
  name?: string;
  description?: string;
  buffer: Buffer;
  durationInSeconds: number;
  originalFileName: string;
  extension: string;
  contentLength: string;
  contentType: string;
}

export class CreateBackgroundMusicCommand implements ICommand {
  readonly name?: string;
  readonly description?: string;
  readonly buffer: Buffer;
  readonly durationInSeconds: number;
  readonly originalFileName: string;
  readonly extension: string;
  readonly contentLength: string;
  readonly contentType: string;

  constructor(props: ICreateBackgroundMusicCommandProps) {
    this.name = props.name;
    this.description = props.description;
    this.buffer = props.buffer;
    this.durationInSeconds = props.durationInSeconds;
    this.originalFileName = props.originalFileName;
    this.extension = props.extension;
    this.contentLength = props.contentLength;
    this.contentType = props.contentType;
  }
}
