import { DomainEvent } from '@common/base/base.domain-event';

interface SoundEffectDeletedEventPayload {
  soundEffectId: string;
}

export class SoundEffectDeletedEvent extends DomainEvent<SoundEffectDeletedEventPayload> {
  readonly aggregate = 'SoundEffect';
}
