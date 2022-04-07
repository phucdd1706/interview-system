export interface questionInterface {
  questionId: string;
  question: string;
  answerStatus: string;
  notes: string;
}

export interface QuestionStackInterface {
  type: string;
  questions: questionInterface[];
}
