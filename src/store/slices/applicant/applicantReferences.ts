// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { QuestionInterface, QuestionStackInterface, ResponseInterviewQuestion, InterviewQuestions } from 'types/interviewQuestion';
import { axiosGet, axiosPost } from 'utils/helpers/axios';
import { QuestionType } from 'types/question';
// THIRD-PARTY
import { createSlice, current } from '@reduxjs/toolkit';

const initialState: ApplicantDataInterface = {
  applicantInfo: {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    interviewTime: '',
    applyPosition: [],
    questions: [],
    note: ''
  },
  interviewQuestions: [],
  questions: []
};

const applicantReferences = createSlice({
  name: 'applicantReferences',
  initialState,
  reducers: {
    applicantFormInit: () => initialState,
    setApplicantInfo(state, action: { payload: { applicant: ApplicantInfo; questions: InterviewQuestions[] } }) {
      console.log(action.payload);
      // state.interviewQuestions = action.payload.map(
      //   (element: InterviewQuestions, index): QuestionStackInterface => ({
      //     type: `Rand ${index}`,
      //     questions: element
      //   })
      // );
    },
    // setReferenceEvaluate(state, action: { payload: ReferenceEvaluate }) {
    //   Object.assign(state, { referenceEvaluate: action.payload });
    // },
    setQuestions(state, action: { payload: InterviewQuestions[] }) {
      const questions = action.payload.map((element) => Object.keys(element).map((key) => [...element[key]])).flat(2);
      state.questions = questions;
    },
    questionsInit(state) {
      state.questions = [];
    },
    deleteInterviewQuestions(state, action: { payload: { questionType: string; id: number } }) {
      const { questionType, id } = action.payload;
      const newInterviewQuestions = state.interviewQuestions.map((element) => {
        element.questions[questionType] = element.questions[questionType].filter((question) => question.id !== id);
        return element;
      });
      state.interviewQuestions = newInterviewQuestions;
    },
    addInterviewQuestions(state, action: { payload: { questionType: string; language: string; question: QuestionType } }) {
      const { questionType, question } = action.payload;
      const isExisted = state.interviewQuestions.some((element) => element.questions[questionType].some((item) => item.id === question.id));
      if (!isExisted) {
        state.interviewQuestions[0].questions[questionType].push(question);
        state.questions = state.questions.filter((element) => element.id !== question.id);
      }
    }
    // handleAnswerScore(state, action: { payload: { id: string; answerScore: string } }) {
    //   const { id, answerScore } = action.payload;
    //   state.interviewQuestions.map((item) => {
    //     item.questions.map((question) => {
    //       if (question.id === id) {
    //         question.answerScore = answerScore;
    //       }
    //       return question;
    //     });
    //     return item;
    //   });
    // },
    //   handleInterviewQuestionNotes(state, action: { payload: { id: string; notes: string } }) {
    //     const { id, notes } = action.payload;
    //     state.interviewQuestions.map((item) => {
    //       item.questions.map((question) => {
    //         if (question.id === id) {
    //           question.notes = notes;
    //         }
    //         return question;
    //       });
    //       return item;
    //     });
    //   }
  }
});

export default applicantReferences.reducer;

export const {
  applicantFormInit,
  addInterviewQuestions,
  deleteInterviewQuestions,
  // handleAnswerScore,
  // handleInterviewQuestionNotes,
  setApplicantInfo,
  // setReferenceEvaluate,
  setQuestions,
  questionsInit
} = applicantReferences.actions;

// ASYNC ACTIONS

export const applicantAPI = {
  applicantReferenceInit: (applicantId: string) =>
    axiosGet<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/applicant/reference/${applicantId}`),
  getQuestionsThunk: (language_id: number, rank_id: number) =>
    axiosPost<ResponseInterviewQuestion>(`${process.env.REACT_APP_API_URL}/v1/client/questions/candidate`, {
      data: [{ rank_advanced_id: rank_id, language_id, rank_id }]
    }),
  getInterviewQuestionThunk: (params: {
    data: Array<{
      language_id: string | number;
      rank_id: string | number;
      rank_advanced_id: string | number;
    }>;
  }) => axiosPost<ResponseInterviewQuestion>(`${process.env.REACT_APP_API_URL}/v1/client/questions/candidate`, params, 'Success'),
  getReferenceEvaluateThunk: (applicantInfo: ApplicantDataInterface) =>
    axiosPost<ReferenceEvaluate>(`${process.env.REACT_APP_FAKE_API_URL}/referenceEvaluate`, applicantInfo)
};
