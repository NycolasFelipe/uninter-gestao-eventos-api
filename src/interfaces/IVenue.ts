export interface IVenueCreate {
  schoolId: number;
  name: string;
  address?: string;
  capacity?: number;
  isInternal?: boolean;
}
