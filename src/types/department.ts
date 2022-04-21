// PROJECT IMPORTS

export interface DepartmentStateProps {
  department: Department[];
  pageCount: number;
  currentPage: number;
  error: DataError[];
}
interface DataError {
  error: {
    errors: string[];
    message: string;
  };
  message: string;
}

export type DepartmentFilter = {
  search?: string;
  status?: number | string;
  currentPage?: number;
  limit?: number;
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
