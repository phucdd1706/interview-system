// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { ResponseInterviewQuestion, InterviewQuestions, QuestionStackInterface } from 'types/interviewQuestion';
import { axiosGet, axiosPost } from 'utils/helpers/axios';
import { QuestionType } from 'types/question';
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

const initialState: ApplicantDataInterface = {
  applicantInfo: {
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    status: 0,
    time: `${new Date().toISOString().split('T')[0]}T09:00`,
    applyPosition: [
      {
        rank_advanced_id: '',
        language_id: '',
        rank_id: ''
      }
    ],
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
    applicantInit: () => initialState,
    setApplicantInfo(state, action: { payload: { applicant: ApplicantInfo; questions: QuestionStackInterface[] } }) {
      state.interviewQuestions = action.payload.questions;
      state.applicantInfo = action.payload.applicant;
      state.applicantInfo.questions = [];
      action.payload.questions.forEach((stack) => {
        Object.keys(stack.questions).forEach((key) => {
          stack.questions[key as 'base' | 'focus' | 'advanced'].forEach((question) => {
            state.applicantInfo.questions &&
              state.applicantInfo.questions.push({
                question_id: question.id || 0,
                type: key
              });
          });
        });
      });
    },
    setInterviewData(
      state,
      action: {
        payload: {
          applicant: ApplicantInfo;
          interviewQuestions: QuestionStackInterface[];
          questions: Array<{
            question_id: number;
            status?: string | number | undefined;
          }>;
        };
      }
    ) {
      state.applicantInfo = action.payload.applicant;
      state.interviewQuestions = action.payload.interviewQuestions;
      state.applicantInfo.questions = action.payload.questions;
    },
    // setReferenceEvaluate(state, action: { payload: ReferenceEvaluate }) {
    //   Object.assign(state, { referenceEvaluate: action.payload });
    // },
    setQuestions(state, action: { payload: InterviewQuestions[] }) {
      // const questions = action.payload.map((element) => Object.keys(element).map((key) => [...element[key]])).flat(2);
      // state.questions = questions;
    },
    questionsInit(state) {
      state.questions = [];
    },
    deleteInterviewQuestions(state, action: { payload: { questionType: string; id: number } }) {
      // const { questionType, id } = action.payload;
      // const newInterviewQuestions = state.interviewQuestions.map((element) => {
      //   element.questions[questionType] = element.questions[questionType].filter((question) => question.id !== id);
      //   return element;
      // });
      // state.interviewQuestions = newInterviewQuestions;
    },
    addInterviewQuestions(state, action: { payload: { questionType: string; language: string; question: QuestionType } }) {
      // const { questionType, question } = action.payload;
      // const isExisted = state.interviewQuestions.some((element) => element.questions[questionType].some((item) => item.id === question.id));
      // if (!isExisted) {
      //   state.interviewQuestions[0].questions[questionType].push(question);
      //   state.questions = state.questions.filter((element) => element.id !== question.id);
      // }
    },
    handleAnswerStatus(state, action: { payload: { id: number; status: number | string } }) {
      const { id, status } = action.payload;
      state.applicantInfo.questions?.forEach((element) => {
        if (element.question_id === id) {
          element.status = status;
        }
      });
      state.interviewQuestions.forEach((element) => {
        Object.keys(element.questions).forEach((key) => {
          element.questions[key as 'base' | 'focus' | 'advanced'].forEach((question) => {
            if (question.candidate_id === id) {
              question.status = status;
            }
          });
        });
      });
    },
    sortDataByKey(state, action: { payload: 'status' | 'rank_id' | 'language_id' | 'type' | 'question_content' }) {
      const base = [...state.interviewQuestions[0].questions.base];
      // @ts-ignore: Unreachable code error
      if (base[0][action.payload] > base[base.length - 1][action.payload]) {
        base.sort((a, b) => Number(a[action.payload]) - Number(b[action.payload]));
      } else {
        base.sort((a, b) => Number(b[action.payload]) - Number(a[action.payload]));
      }
      Object.assign(state.interviewQuestions[0].questions, { base });
    },
    handleInterviewNote(state, action: { payload: string }) {
      state.applicantInfo.note = action.payload;
    }
  }
});

export default applicantReferences.reducer;

export const {
  applicantInit,
  addInterviewQuestions,
  deleteInterviewQuestions,
  handleAnswerStatus,
  setApplicantInfo,
  setInterviewData,
  setQuestions,
  questionsInit,
  sortDataByKey,
  handleInterviewNote
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
    axiosPost<ReferenceEvaluate>(`${process.env.REACT_APP_FAKE_API_URL}/referenceEvaluate`, applicantInfo),
  getInterviewDataThunk: (id: string | number) => axiosGet<any>(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`)
};
