import { DomainEvent } from '@common/base/base.domain-event';

export interface AvatarDeletedEventPayload {
  avatarId: string;
}

export class AvatarDeletedEvent extends DomainEvent<AvatarDeletedEventPayload> {
  readonly aggregate = 'Avatar';
}
