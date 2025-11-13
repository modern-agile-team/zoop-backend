import { TSID } from 'tsid-ts';

import { SoundEffectCreatedEvent } from '@module/sound-effect/events/sound-effect-created.event';
import { SoundEffectDeletedEvent } from '@module/sound-effect/events/sound-effect-deleted.event';
import { SoundEffectUpdatedEvent } from '@module/sound-effect/events/sound-effect-updated.event';

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
  description: string | null;
}

interface CreateSoundEffectProps {
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

interface UpdateSoundEffectProps {
  name?: string;
  description?: string | null;
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
        description: props.description ?? null,
      },
      createdAt: date,
      updatedAt: date,
    });

    soundEffect.apply(
      new SoundEffectCreatedEvent(soundEffect.id, {
        fileName: soundEffect.fileName,
        originalFileName: props.originalFileName,
        name: props.name,
        extension: props.extension,
        contentLength: props.contentLength,
        contentType: props.contentType,
        description: props.description,
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

  get description(): string | null {
    return this.props.description;
  }

  update(props: UpdateSoundEffectProps) {
    if (props.name !== undefined) {
      this.props.name = props.name;
    }

    if (props.description !== undefined) {
      this.props.description = props.description;
    }

    this.updatedAt = new Date();

    this.apply(
      new SoundEffectUpdatedEvent(this.id, {
        name: props.name,
        description: props.description,
      }),
    );
  }

  delete() {
    this.apply(
      new SoundEffectDeletedEvent(this.id, {
        soundEffectId: this.id,
      }),
    );
  }

  public validate(): void {}
}
