import { DomainEvent } from '@common/base/base.domain-event';

interface SoundEffectCreatedEventPayload {
  fileName: string;
  originalFileName: string;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

export class SoundEffectCreatedEvent extends DomainEvent<SoundEffectCreatedEventPayload> {
  readonly aggregate = 'SoundEffect';
}
