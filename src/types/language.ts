// PROJECT IMPORTS

export interface Languages {
  id: number | string;
  name: string;
  description: string;
  created_at: string;
  status: number;
}

export interface SearchValues {
  search?: string;
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

export interface LanguageStateProps {
  language: Languages[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}
