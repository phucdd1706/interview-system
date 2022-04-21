// PROJECT IMPORTS

export interface QuestionStateProps {
  questions: QuestionType[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type QuestionFilter = {
  search?: string;
  status?: string;
  currentPage?: number;
};

export type SortStatusProps = {
  value?: any;
  label: string;
};

export type QuestionType = {
  id?: number;
  rankId?: number | string;
  departmentId?: number | string;
  languageId?: number | string;
  questionContent?: string;
  type?: number;
  status?: number;
};

export type SelectProps = {
  value?: any;
  label: string;
};
