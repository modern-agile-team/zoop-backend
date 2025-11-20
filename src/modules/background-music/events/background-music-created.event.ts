import { DomainEvent } from '@common/base/base.domain-event';

interface BackgroundMusicCreatedEventPayload {
  fileName: string;
  originalFileName: string;
  durationInSeconds: number;
  name: string;
  extension: string;
  contentLength: string;
  contentType: string;
  description?: string;
}

export class BackgroundMusicCreatedEvent extends DomainEvent<BackgroundMusicCreatedEventPayload> {
  readonly aggregate = 'BackgroundMusic';
}
