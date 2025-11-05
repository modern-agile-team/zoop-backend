import { TSID } from 'tsid-ts';

import { SoundEffectCreatedEvent } from '@module/sound-effect/events/sound-effect-created.event';

import {
  AggregateRoot,
  CreateEntityProps,
  generateEntityId,
} from '@common/base/base.entity';

export interface SoundEffectProps {
  fileName: string;
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

interface CreateSoundEffectProps {
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

export class SoundEffect extends AggregateRoot<SoundEffectProps> {
  constructor(props: CreateEntityProps<SoundEffectProps>) {
    super(props);
  }

  static create(props: CreateSoundEffectProps) {
    const id = generateEntityId();
    const date = new Date();

    const soundEffect = new SoundEffect({
      id,
      props: {
        fileName: `${TSID.create().number.toString()}.${props.extension}`,
        originalFileName: props.originalFileName,
        name: props.name,
        extension: props.extension,
        contentLength: props.contentLength,
        contentType: props.contentType,
        description: props.description,
      },
      createdAt: date,
      updatedAt: date,
    });

    soundEffect.apply(
      new SoundEffectCreatedEvent(soundEffect.id, {
        fileName: soundEffect.fileName,
        originalFileName: soundEffect.originalFileName,
        name: soundEffect.name,
        extension: soundEffect.extension,
        contentLength: soundEffect.contentLength,
        contentType: soundEffect.contentType,
        description: soundEffect.description,
      }),
    );

    return soundEffect;
  }

  get fileName(): string {
    return this.props.fileName;
  }

  get originalFileName(): string {
    return this.props.originalFileName;
  }

  get name(): string {
    return this.props.name;
  }

  get extension(): string {
    return this.props.extension;
  }

  get contentType(): string {
    return this.props.contentType;
  }

  get contentLength(): string {
    return this.props.contentLength;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  public validate(): void {}
}
