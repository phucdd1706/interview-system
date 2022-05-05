// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';

export interface CustomerStateProps {
  customers: UserProfile[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type CustomerFilter = {
  search?: string;
  status?: number | string;
  currentPage?: number;
  limit?: number;
};

export type SelectProps = {
  value?: any;
  label: string;
};
export type Customer = {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  status?: number;
  type?: number;
  created_at?: Date;
  updated_at?: Date;
};
export interface Payload {
  id?: string | number;
  params?: Customer;
  callback?: (response: any) => void;
}
