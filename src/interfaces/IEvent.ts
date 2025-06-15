import { EventStatus } from "src/models/Event";

export interface IEventCreate {
  schoolId: number;
  eventTypeId: number;
  organizerUserId: bigint;
  name: string;
  description?: string;
  objective?: string;
  targetAudience?: string;
  status?: EventStatus;
  isPublic?: boolean;
  registrationDeadline: Date;
}