export interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string
  profilePictureUrl?: string;
  isActive?: boolean;
  schoolId?: number;
  roleId?: number;
}

export interface IUserCreateResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  profilePictureUrl?: string | null;
  isActive: boolean;
  schoolId?: number | null;
  roleId?: number | null;
}