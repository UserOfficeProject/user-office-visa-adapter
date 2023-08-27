export interface InstrumentCreationEventPayload {
  id: number;
  name: string;
  shortCode: string;
  description: string;
  managerUserId: number;
}

export type InstrumentUpdationEventPayload = InstrumentCreationEventPayload;

export type InstrumentDeletionEventPayload = InstrumentCreationEventPayload;
