// PROJECT IMPORTS

export interface Candidates {
  id?: number;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  rank?: number | string;
  password?: string;
  password_confirmation?: string;
  created_at?: string;
  updated_at?: string;
  status?: any;
}

export interface SearchValues {
  search?: string;
  rank?: number | string;
  status?: number | string;
  currentPage?: number;
  limit?: number;
}

export interface Payload {
  id: string | number;
  params: any;
  callback: (response: any) => void;
}

export type Status = {
  value?: number | string;
  label: string;
};

export interface InProgressStateProps {
  inProgress: Candidates[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}
