import { DomainEvent } from '@common/base/base.domain-event';

interface AvatarCreatedEventPayload {
  name: string;
  originalFileName: string;
  fileName: string;
  extension: string;
  contentLength: string;
  contentType: string;
  width: number;
  height: number;
  description?: string;
  usageCount: number;
}

export class AvatarCreatedEvent extends DomainEvent<AvatarCreatedEventPayload> {
  readonly aggregate = 'Avatar';
}
