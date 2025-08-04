import { EventStatus } from "src/models/Event";

export interface IEventCreate {
  name: string;
  description?: string;
  objective?: string;
  targetAudience?: string;
  status?: EventStatus;
  isPublic?: boolean;
  schoolId: number;
  eventTypeId: number;
  venueId: number;
  organizerUserId: bigint;
  startDate: Date;
  endDate: Date;
}