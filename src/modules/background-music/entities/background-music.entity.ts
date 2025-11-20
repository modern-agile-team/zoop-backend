import { TSID } from 'tsid-ts';

import { BackgroundMusicCreatedEvent } from '@module/background-music/events/background-music-created.event';

import {
  AggregateRoot,
  CreateEntityProps,
  generateEntityId,
} from '@common/base/base.entity';

export interface BackgroundMusicProps {
  fileName: string;
  originalFileName: string;
  durationInSeconds: number;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description: string | null;
}

interface CreateBackgroundMusicProps {
  originalFileName: string;
  durationInSeconds: number;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

export class BackgroundMusic extends AggregateRoot<BackgroundMusicProps> {
  constructor(props: CreateEntityProps<BackgroundMusicProps>) {
    super(props);
  }

  static create(props: CreateBackgroundMusicProps) {
    const id = generateEntityId();
    const date = new Date();

    const backgroundMusic = new BackgroundMusic({
      id,
      props: {
        fileName: `${TSID.create().number.toString()}.${props.extension}`,
        originalFileName: props.originalFileName,
        durationInSeconds: props.durationInSeconds,
        name: props.name,
        extension: props.extension,
        contentLength: props.contentLength,
        contentType: props.contentType,
        description: props.description ?? null,
      },
      createdAt: date,
      updatedAt: date,
    });

    backgroundMusic.apply(
      new BackgroundMusicCreatedEvent(backgroundMusic.id, {
        fileName: backgroundMusic.fileName,
        originalFileName: props.originalFileName,
        durationInSeconds: props.durationInSeconds,
        name: props.name,
        extension: props.extension,
        contentLength: props.contentLength,
        contentType: props.contentType,
        description: props.description,
      }),
    );

    return backgroundMusic;
  }

  get fileName(): string {
    return this.props.fileName;
  }

  get originalFileName(): string {
    return this.props.originalFileName;
  }

  get durationInSeconds(): number {
    return this.props.durationInSeconds;
  }

  get name(): string {
    return this.props.name;
  }

  get extension(): string {
    return this.props.extension;
  }

  get contentLength(): string {
    return this.props.contentLength;
  }

  get contentType(): string {
    return this.props.contentType;
  }

  get description(): string | null {
    return this.props.description;
  }

  public validate(): void {}
}
