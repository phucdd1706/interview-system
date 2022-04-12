// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';

export interface UserStateProps {
  users: UserProfile[];
  error: object | string | null;
}

export type UserFilter = {
  search?: string;
  status?: string;
};

export type SortStatusProps = {
  value?: string;
  label: string;
};

export type Administrator = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  status?: number;
  type?: number;
};
