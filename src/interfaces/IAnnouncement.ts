import { AnnouncementStatus, TargetAudienceType } from "src/models/Announcement";

export interface IAnnouncementCreate {
  eventId: bigint;
  authorUserId: bigint;
  schoolId: number;
  title: string;
  content?: string;
  publishDate: Date;
  expiryDate?: Date;
  status: AnnouncementStatus;
  targetAudienceType: TargetAudienceType
  targetAudienceIds?: object | null;
}