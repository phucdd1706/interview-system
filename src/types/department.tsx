// PROJECT IMPORTS

export interface DepartmentStateProps {
  department: Department[];
  error: object | string | null;
}

export type DepartmentFilter = {
  search?: string;
  status?: string;
};

export type SortStatusProps = {
  value?: any;
  label: string;
};

export type Department = {
  id?: string;
  name?: string;
  code?: string;
  note?: string;
  status?: number;
  created_at?: Date;
};
