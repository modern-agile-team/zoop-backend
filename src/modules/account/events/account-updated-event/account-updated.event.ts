import { DomainEvent } from '@common/base/base.domain-event';

interface AccountUpdatedEventPayload {
  nickname?: string;
  avatarFileName?: string;
}

export class AccountUpdatedEvent extends DomainEvent<AccountUpdatedEventPayload> {
  readonly aggregate = 'Account';
}
