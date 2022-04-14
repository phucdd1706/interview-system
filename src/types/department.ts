// PROJECT IMPORTS

export interface DepartmentStateProps {
  department: Department[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type DepartmentFilter = {
  search?: string;
  status?: number | string;
  currentPage?: number;
  limit?: number;
};

export type SortStatusProps = {
  value?: any;
  label: string;
};

export type Department = {
  id?: string;
  name?: string;
  code?: string;
  status?: number;
  created_at?: Date;
};
export type SelectProps = {
  value?: any;
  label: string;
};
