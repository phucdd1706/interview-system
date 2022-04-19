// PROJECT IMPORTS

export interface Candidates {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  rank: number | string;
  created_at: string;
  status: number;
}

export interface SearchValues {
  search?: string;
  rank?: number | string;
  status?: number | string;
  currentPage?: number;
  limit?: number;
}

export interface Payload {
  id?: string | number;
  params?: any;
  token?: any;
  callback?: (response: any) => void;
}

export type Status = {
  value?: any;
  label: string;
};

export interface CompleteStateProps {
  complete: Candidates[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}
