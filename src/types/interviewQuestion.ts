import { QuestionType } from './question';

export interface QuestionInterface {
  id: string;
  question: string;
  answerScore?: string;
  notes?: string;
}

export interface InterviewQuestions {
  base: QuestionType[];
  focus: QuestionType[];
  advanced: QuestionType[];
}

export interface QuestionStackInterface {
  language: string;
  questions: InterviewQuestions;
}

export interface ResponseInterviewQuestion {
  success: Array<QuestionStackInterface>;
}
