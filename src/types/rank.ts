// PROJECT IMPORTS

export interface RankStateProps {
  ranks: RankType[];
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

export type RankType = {
  id?: string;
  name?: string;
  description?: string;
  status?: number;
};

export type SelectProps = {
  value?: any;
  label: string;
};
