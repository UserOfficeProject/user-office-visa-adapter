export interface InstrumentCreationEventPayload {
  id: number;
  name: string;
}

export type InstrumentUpdationEventPayload = InstrumentCreationEventPayload;

export type InstrumentDeletionEventPayload = InstrumentCreationEventPayload;
