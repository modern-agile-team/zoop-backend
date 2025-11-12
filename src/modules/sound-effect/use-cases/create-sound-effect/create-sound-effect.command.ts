import { ICommand } from '@nestjs/cqrs';

export interface ICreateSoundEffectCommandProps {
  name?: string;
  description?: string;
  buffer: Buffer;
  originalFileName: string;
  extension: string;
  contentLength: string;
  contentType: string;
}

export class CreateSoundEffectCommand implements ICommand {
  readonly name?: string;
  readonly description?: string;
  readonly buffer: Buffer;
  readonly originalFileName: string;
  readonly extension: string;
  readonly contentLength: string;
  readonly contentType: string;

  constructor(props: ICreateSoundEffectCommandProps) {
    this.name = props.name;
    this.description = props.description;
    this.buffer = props.buffer;
    this.originalFileName = props.originalFileName;
    this.extension = props.extension;
    this.contentLength = props.contentLength;
    this.contentType = props.contentType;
  }
}
