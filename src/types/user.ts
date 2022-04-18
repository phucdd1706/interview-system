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

export type SelectProps = {
  value?: any;
  label: string;
};
