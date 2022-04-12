// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { questionInterface } from 'types/interviewQuestion';
import { dispatch } from 'store';

// THIRD-PARTY
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    experiences: [],
    applyPosition: [],
    notes: ''
  },
  interviewQuestions: [
    // {
    //   type: 'Basic',
    //   questions: [
    //     {
    //       questionId: '1',
    //       question: 'sdfdvbvcxb?',
    //       answerScore: 'good',
    //       notes: ''
    //     },
    //     {
    //       questionId: '2',
    //       question: 'What is dsfasdfqwer age?',
    //       answerScore: 'bad',
    //       notes: ''
    //     },
    //     {
    //       questionId: '3',
    //       question: 'Expecteasdfwerd salary?',
    //       answerScore: 'good',
    //       notes: ''
    //     }
    //   ]
    // },
    // {
    //   type: 'React J1',
    //   questions: [
    //     {
    //       questionId: '4',
    //       question: 'What is ReacqwerqwertJS?',
    //       answerScore: 'excellent',
    //       notes: ''
    //     },
    //     {
    //       questionId: '5',
    //       question: 'What is sdfqweRedux?',
    //       answerScore: '',
    //       notes: ''
    //     },
    //     {
    //       questionId: '6',
    //       question: 'What qweris J1?',
    //       answerScore: '',
    //       notes: 'Thang nay tra loi chan'
    //     },
    //     {
    //       questionId: '9',
    //       question: 'explain abfsfqewout React lifecycle?',
    //       answerScore: '',
    //       notes: ''
    //     }
    //   ]
    // },
    // {
    //   type: 'Advanced',
    //   questions: [
    //     {
    //       questionId: '7',
    //       question: 'How to increaseqwer performance?',
    //       answerScore: '',
    //       notes: ''
    //     },
    //     {
    //       questionId: '8',
    //       question: 'How to incrfgwqerease security?',
    //       answerScore: '',
    //       notes: ''
    //     }
    //   ]
    // }
  ]
};

const applicantReferences = createSlice({
  name: 'applicantReferences',
  initialState,
  reducers: {
    setApplicantInfo(state, action: { payload: ApplicantDataInterface }) {
      console.log(action.payload);
      Object.assign(state, action.payload);
    },
    setReferenceEvaluate(state, action: { payload: ReferenceEvaluate }) {
      Object.assign(state, action.payload);
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
    addInterviewQuestions(state, action: { payload: { type: string; question: questionInterface } }) {
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

// ASYNC ACTIONS

const postData = async <T>(url: string, data: any): Promise<T> => {
  const response = await axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => err);
  return response;
};

const getData = async <T>(url: string): Promise<T> => {
  const response = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
  return response;
};

const applicantAPI = {
  applicantReferenceInit: () => getData<ApplicantDataInterface>(`${process.env.REACT_APP_API_URL}/applicant/reference/init`),
  getInterviewQuestion: (applicantInfo: ApplicantInfo) =>
    postData<ApplicantDataInterface>(`${process.env.REACT_APP_API_URL}`, applicantInfo),
  getReferenceEvaluate: (applicantInfo: ApplicantDataInterface) =>
    postData<ReferenceEvaluate>(`${process.env.REACT_APP_API_URL}`, applicantInfo)
};

export default applicantReferences.reducer;

export const {
  setApplicantInfo,
  setReferenceEvaluate,
  deleteInterviewQuestions,
  addInterviewQuestions,
  handleAnswerScore,
  handleInterviewQuestionNotes
} = applicantReferences.actions;

export const applicantReferenceInit = createAsyncThunk('applicantReferences/applicantReferenceInit', async () => {
  const data = await applicantAPI.applicantReferenceInit();
  return dispatch(setApplicantInfo(data));
});

export const getInterviewQuestion = createAsyncThunk('applicant/getInterviewQuestion', async (params: ApplicantInfo, thunkAPI) => {
  const data = await applicantAPI.getInterviewQuestion(params);
  return dispatch(setApplicantInfo(data));
});

export const getReferenceEvaluate = createAsyncThunk('applicant/getReferenceEvaluate', async (params: ApplicantDataInterface, thunkAPI) => {
  const data = await applicantAPI.getReferenceEvaluate(params);
  return dispatch(setReferenceEvaluate(data));
});
