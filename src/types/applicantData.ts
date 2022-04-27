import { QuestionStackInterface, QuestionInterface } from './interviewQuestion';

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
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  interviewTime: string;
  experiences: Job[];
  applyPosition: Array<{
    id: string;
    position: string;
    level: string;
  }>;
  notes: string;
}

export interface ApplicantDataInterface {
  applicantInfo: ApplicantInfo;
  interviewQuestions: QuestionStackInterface[];
  referenceEvaluate?: ReferenceEvaluate;
  interviewerEvaluate?: InterviewerEvaluate;
  questions: QuestionInterface[];
}
