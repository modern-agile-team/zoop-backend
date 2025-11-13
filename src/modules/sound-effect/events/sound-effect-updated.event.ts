import { DomainEvent } from '@common/base/base.domain-event';

interface SoundEffectUpdatedEventPayload {
  name?: string;
  description?: string | null;
}

export class SoundEffectUpdatedEvent extends DomainEvent<SoundEffectUpdatedEventPayload> {
  readonly aggregate = 'SoundEffect';
}
