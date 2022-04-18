// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { QuestionInterface, QuestionStackInterface } from 'types/interviewQuestion';
import { axiosGet, axiosPost } from 'utils/helpers/axios';

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

const initialState: ApplicantDataInterface = {
  applicantInfo: {
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    interviewTime: '',
    notes: '',
    experiences: [],
    applyPosition: []
  },
  interviewQuestions: [],
  questions: []
};

const applicantReferences = createSlice({
  name: 'applicantReferences',
  initialState,
  reducers: {
    applicantFormInit: () => initialState,
    setApplicantInfo(state, action: { payload: ApplicantDataInterface }) {
      action.payload.interviewQuestions.map((item: QuestionStackInterface) => {
        item.questions.map((question: QuestionInterface) => {
          question.answerScore = '';
          question.notes = '';
          return question;
        });
        return item;
      });
      Object.assign(state, action.payload);
    },
    setReferenceEvaluate(state, action: { payload: ReferenceEvaluate }) {
      Object.assign(state, { referenceEvaluate: action.payload });
    },
    setQuestions(state, action: { payload: QuestionInterface[] }) {
      const questions = action.payload.filter((element) =>
        state.interviewQuestions.every((questionStack) =>
          questionStack.questions.every((question) => question.questionId !== element.questionId)
        )
      );
      Object.assign(state, { questions });
    },
    questionsInit(state) {
      state.questions = [];
    },
    deleteInterviewQuestions(state, action: { payload: { type: string; questionId: string } }) {
      const { type, questionId } = action.payload;
      state.interviewQuestions.filter((item) => {
        if (item.type.toLowerCase() === type.toLowerCase()) {
          item.questions = item.questions.filter((question) => question.questionId !== questionId);
        }
        return item;
      });
    },
    addInterviewQuestions(state, action: { payload: { type: string; question: QuestionInterface } }) {
      const { type, question } = action.payload;
      state.interviewQuestions.filter((item) => {
        if (
          item.type.toLowerCase() === type.toLowerCase() &&
          item.questions.every((element) => element.questionId !== question.questionId)
        ) {
          item.questions.push(question);
        }
        return item;
      });
      state.questions = state.questions.filter((element) => element.questionId !== question.questionId);
    },
    handleAnswerScore(state, action: { payload: { questionId: string; answerScore: string } }) {
      const { questionId, answerScore } = action.payload;
      state.interviewQuestions.map((item) => {
        item.questions.map((question) => {
          if (question.questionId === questionId) {
            question.answerScore = answerScore;
          }
          return question;
        });
        return item;
      });
    },
    handleInterviewQuestionNotes(state, action: { payload: { questionId: string; notes: string } }) {
      const { questionId, notes } = action.payload;
      state.interviewQuestions.map((item) => {
        item.questions.map((question) => {
          if (question.questionId === questionId) {
            question.notes = notes;
          }
          return question;
        });
        return item;
      });
    }
  }
});

export default applicantReferences.reducer;

export const {
  applicantFormInit,
  addInterviewQuestions,
  deleteInterviewQuestions,
  handleAnswerScore,
  handleInterviewQuestionNotes,
  setApplicantInfo,
  setReferenceEvaluate,
  setQuestions,
  questionsInit
} = applicantReferences.actions;

// ASYNC ACTIONS

export const applicantAPI = {
  applicantReferenceInit: (applicantId: string) =>
    axiosGet<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/applicant/reference/${applicantId}`),
  getQuestionsThunk: (type: string, value: string) =>
    axiosPost<QuestionInterface[]>(`${process.env.REACT_APP_FAKE_API_URL}/questions`, { type, value }),
  getInterviewQuestionThunk: (applicantInfo: ApplicantInfo) =>
    axiosPost<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/interview-question`, applicantInfo, 'Success hehe'),
  getReferenceEvaluateThunk: (applicantInfo: ApplicantDataInterface) =>
    axiosPost<ReferenceEvaluate>(`${process.env.REACT_APP_FAKE_API_URL}/referenceEvaluate`, applicantInfo)
};
