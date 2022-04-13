// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';

export interface CustomerStateProps {
  customers: UserProfile[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type SelectProps = {
  value?: any;
  label: string;
};
