import { ICommand } from '@nestjs/cqrs';

export interface ICreateAvatarCommandProps {
  name?: string;
  description?: string;
  buffer: Buffer;
  originalFileName: string;
  extension: string;
  contentLength: string;
  contentType: string;
  width: number;
  height: number;
}

export class CreateAvatarCommand implements ICommand {
  readonly name?: string;
  readonly description?: string;
  readonly buffer: Buffer;
  readonly originalFileName: string;
  readonly extension: string;
  readonly contentLength: string;
  readonly contentType: string;
  readonly width: number;
  readonly height: number;

  constructor(props: ICreateAvatarCommandProps) {
    this.name = props.name;
    this.description = props.description;
    this.buffer = props.buffer;
    this.originalFileName = props.originalFileName;
    this.extension = props.extension;
    this.contentLength = props.contentLength;
    this.contentType = props.contentType;
    this.width = props.width;
    this.height = props.height;
  }
}
