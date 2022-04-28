import { QuestionType } from './question';

export interface QuestionInterface {
  id: string;
  question: string;
  answerScore?: string;
  notes?: string;
}

export interface InterviewQuestions {
  [key: string]: QuestionType[];
}

export interface QuestionStackInterface {
  type: string;
  questions: InterviewQuestions;
}

export interface ResponseInterviewQuestion {
  success: Array<InterviewQuestions>;
}
