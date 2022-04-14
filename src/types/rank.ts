// PROJECT IMPORTS

export interface RankStateProps {
  ranks: Rank[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type RankFilter = {
  search?: string;
  status?: string;
  currentPage?: number;
};

export type SortStatusProps = {
  value?: any;
  label: string;
};

export type Rank = {
  id?: string;
  name?: string;
  description?: string;
  status?: number;
};
