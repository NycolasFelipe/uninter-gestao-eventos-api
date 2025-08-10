import { EventStatus } from "src/enums/EventStatusEnum";

export interface IEventUpdateCreate {
  userId: bigint;
  eventId: number;
  status: EventStatus;
  updateDate?: Date;
}