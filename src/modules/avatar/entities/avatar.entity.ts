import { TSID } from 'tsid-ts';

import { AvatarAssignedEvent } from '@module/avatar/events/avatar-assigned.event';
import { AvatarCreatedEvent } from '@module/avatar/events/avatar-created.event';
import { AvatarDeletedEvent } from '@module/avatar/events/avatar-deleted-event';
import { AvatarUpdatedEvent } from '@module/avatar/events/avatar-updated-event';

import {
  AggregateRoot,
  CreateEntityProps,
  generateEntityId,
} from '@common/base/base.entity';

export interface AvatarProps {
  fileName: string;
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  width: number;
  height: number;
  description?: string | null;
  usageCount: number;
}

interface CreateAvatarProps {
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  width: number;
  height: number;
  description?: string;
}

interface UpdateAvatarProps {
  name?: string;
  description?: string | null;
}

export class Avatar extends AggregateRoot<AvatarProps> {
  constructor(props: CreateEntityProps<AvatarProps>) {
    super(props);
  }

  static create(props: CreateAvatarProps) {
    const id = generateEntityId();
    const date = new Date();

    const avatar = new Avatar({
      id,
      props: {
        name: props.name,
        originalFileName: props.originalFileName,
        extension: props.extension,
        fileName: `${TSID.create().number.toString()}.${props.extension}`,
        contentLength: props.contentLength,
        contentType: props.contentType,
        width: props.width,
        height: props.height,
        description: props.description,
        usageCount: 0,
      },
      createdAt: date,
      updatedAt: date,
    });

    avatar.apply(
      new AvatarCreatedEvent(avatar.id, {
        name: props.name,
        originalFileName: props.originalFileName,
        fileName: avatar.fileName,
        extension: props.extension,
        contentLength: props.contentLength,
        contentType: props.contentType,
        width: props.width,
        height: props.height,
        description: props.description,
        usageCount: 0,
      }),
    );

    return avatar;
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

  get width(): number {
    return this.props.width;
  }

  get height(): number {
    return this.props.height;
  }

  get description(): string | undefined | null {
    return this.props.description;
  }

  get usageCount(): number {
    return this.props.usageCount;
  }

  assign() {
    this.props.usageCount += 1;
    this.updatedAt = new Date();

    this.apply(
      new AvatarAssignedEvent(this.id, {
        avatarId: this.id,
        usageCount: this.props.usageCount,
      }),
    );
  }

  update(props: UpdateAvatarProps) {
    if (props.name !== undefined) {
      this.props.name = props.name;
    }

    if (props.description !== undefined) {
      this.props.description = props.description;
    }

    this.updatedAt = new Date();

    this.apply(
      new AvatarUpdatedEvent(this.id, {
        name: props.name,
        description: props.description,
      }),
    );
  }

  delete() {
    this.apply(
      new AvatarDeletedEvent(this.id, {
        avatarId: this.id,
      }),
    );
  }

  public validate(): void {}
}
