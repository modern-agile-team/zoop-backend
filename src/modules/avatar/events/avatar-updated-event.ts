import { DomainEvent } from '@common/base/base.domain-event';

export interface AvatarUpdatedEventPayload {
  name?: string;
  description?: string | null;
}

export class AvatarUpdatedEvent extends DomainEvent<AvatarUpdatedEventPayload> {
  readonly aggregate = 'Avatar';
}
