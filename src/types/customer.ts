// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';

export interface CustomerStateProps {
  customers: UserProfile[];
  error: object | string | null;
}

export type SelectProps = {
  value?: any;
  label: string;
};
