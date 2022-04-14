export interface Candidates {
  id: number;
  name: string;
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
}

export interface Payload {
  id: string | number;
  params: any;
  token: string;
  callback: (response: any) => void;
}
