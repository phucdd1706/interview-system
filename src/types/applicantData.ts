import { QuestionStackInterface } from './question';

export interface Job {
  position: string;
  durations: number;
}

export interface Employment {
  company: string;
  job: string;
  startDate: string;
  endDate: string;
}

export interface ApplicantDataInterface {
  id: string;
  fristName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  interviewTime: string;
  experiences: Job[];
  applyPosition: Array<{
    position: string;
    level: string;
  }>;
  employment: Employment[];
  interviewQuestion: QuestionStackInterface[];
  referenceEvaluate: {
    totalQuestions: number;
    passedQuestions: number;
    failedQuestions: number;
    passedPercentage: number;
    result: string;
    salary: number;
  };
  interviewerEvaluate: {
    level: string;
    expectedSalary: number;
    result: string;
    salary: number;
    notes: number;
  };
}
