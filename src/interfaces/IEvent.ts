import { EventStatus } from "src/enums/EventStatusEnum";
import { IBaseParams } from "./IParams";

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

export interface IEventParams extends IBaseParams {
  eventId?: number;
  schoolId?: number;
  eventTypeId?: number;
  eventTypeIds?: string;
  organizerUserId?: bigint;
  venueId?: number;
  name?: string;
  targetAudience?: string;
  status?: string;
  isPublic?: boolean;
  startDate?: Date;
  endDate?: Date;
}