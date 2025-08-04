import { EventStatus } from "src/models/Event";

export interface IEventUpdateCreate {
  userId: bigint;
  eventId: number;
  status: EventStatus;
  updateDate?: Date;
}