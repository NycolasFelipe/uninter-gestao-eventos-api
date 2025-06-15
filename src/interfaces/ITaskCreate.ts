import { TaskPriority, TaskStatus } from "src/models/Task";

export interface ITaskCreate {
  eventId: number;
  assignedToUserId: bigint;
  createdByUserId: bigint;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  plannedStartDate?: Date;
  actualStartDate?: Date;
  plannedEndDate?: Date;
  actualEndDate?: Date;
}