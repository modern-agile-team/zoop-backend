import { DomainEvent } from '@common/base/base.domain-event';

interface AvatarAssignedEventPayload {
  avatarId: string;
  usageCount: number;
}

export class AvatarAssignedEvent extends DomainEvent<AvatarAssignedEventPayload> {
  readonly aggregate = 'Avatar';
}
