import { QuestionStackInterface, QuestionInterface } from './interviewQuestion';
import { QuestionType } from './question';

export interface Job {
  id: string;
  position: string;
  durations: string;
}

export interface Employment {
  company: string;
  job: string;
  startDate: string;
  endDate: string;
}

export interface ReferenceEvaluate {
  totalQuestions: number;
  passedQuestions: number;
  failedQuestions: number;
  passedPercentage: number;
  result: string;
  salary: number;
}
export interface InterviewerEvaluate {
  level: string;
  expectedSalary: number;
  result: string;
  salary: number;
  notes: string;
}

export interface ApplicantInfo {
  id?: number;
  name: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  time: string;
  questions?: Array<{ question_id: number; status?: number | string; type?: string; language_id?: number }>;
  experiences?: Job[];
  applyPosition: Array<{
    rank_advanced_id: string;
    language_id: string;
    rank_id: string;
  }>;
  status?: number;
  note?: string;
}

export interface ApplicantDataAPI {
  id?: number;
  name: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  time: string;
  questions?: Array<{ question_id: number; status?: number | string; type?: string; language_id?: number }>;
  experiences?: Job[];
  applyPosition?: Array<{
    rank_advanced_id: string;
    language_id: string;
    rank_id: string;
  }>;
  status?: number;
  note?: string;
}

export interface ApplicantDataInterface {
  applicantInfo: ApplicantInfo;
  interviewQuestions: QuestionStackInterface[];
  referenceEvaluate?: ReferenceEvaluate;
  interviewerEvaluate?: InterviewerEvaluate;
  questions: QuestionType[];
}
