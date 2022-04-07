export interface Candidates {
  id: number;
  name: string;
  phone: string;
  email: string;
  rank: number | string;
  created_at: string;
}

export interface SearchValues {
  search?: string;
  rank?: number | string;
}

export interface Rank {
  id: number | string;
  rankName: string;
}

export interface Payload {
  params: any;
  token: string;
  callback: (response: any) => void;
}
