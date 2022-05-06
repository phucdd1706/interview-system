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
  id?: number;
  candidate_id?: number;
  status?: string | number;
  created_at?: string;
  updated_at?: string;
  question_id?: number;
  question?: QuestionType;
  rankId: string | number;
  languageId: string | number;
  type: string;
}

export interface SearchValues {
  search?: string;
  status?: number | string;
  currentPage?: number | string;
  limit?: number;
}

export interface SearchQuestions {
  rank_id?: number | string;
  language_id?: number | string;
  typeId?: number | string;
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
