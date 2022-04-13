export interface QuestionInterface {
  questionId: string;
  question: string;
  answerScore?: string;
  notes?: string;
}

export interface QuestionStackInterface {
  type: string;
  questions: QuestionInterface[];
}
