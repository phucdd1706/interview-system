// PROJECT IMPORTS
import { QuestionType } from 'types/question';

export interface Candidates {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
  note?: string;
  time?: string;
  created_at?: string;
  updated_at?: string;
  phone?: number | string;
  address?: string;
  status?: any;
  candidate_question?: any;
}

export interface Question {
  candidate_id: number;
  status: string | number;
  id: number;
  created_at: string;
  update_at: string;
  question_id: number;
  question: QuestionType;
}

export interface SearchValues {
  search?: string;
  status?: number | string;
  currentPage?: number | string;
  limit?: number;
}

export interface Payload {
  id?: string | number;
  params?: any;
  callback?: (response: any) => void;
}

export type Status = {
  value?: number | string;
  label: string;
};

export interface HistoryStateProps {
  history: Candidates[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}
