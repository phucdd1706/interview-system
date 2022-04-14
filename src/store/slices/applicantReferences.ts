// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { QuestionInterface, QuestionStackInterface } from 'types/interviewQuestion';
import { dispatch } from 'store';
import { openSnackbar } from './snackbar';
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
    notes: '',
    experiences: [],
    applyPosition: []
  },
  interviewQuestions: []
};

const applicantReferences = createSlice({
  name: 'applicantReferences',
  initialState,
  reducers: {
    applicantInit: () => initialState,
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
  applicantInit,
  addInterviewQuestions,
  deleteInterviewQuestions,
  handleAnswerScore,
  handleInterviewQuestionNotes,
  setApplicantInfo,
  setReferenceEvaluate,
  setQuestions
} = applicantReferences.actions;

// ASYNC ACTIONS

const postData = async <T>(url: string, data: any): Promise<T> => {
  const response = await axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => {
      dispatch(
        openSnackbar({
          open: true,
          message: err.response.data,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    });
  return response;
};

const getData = async <T>(url: string): Promise<T> => {
  const response = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      dispatch(
        openSnackbar({
          open: true,
          message: err.response.data,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    });
  return response;
};

const applicantAPI = {
  applicantReferenceInit: () => getData<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/applicant/reference/init`),
  getQuestionsThunk: (type: string, value: string) =>
    postData<QuestionInterface[]>(`${process.env.REACT_APP_FAKE_API_URL}/questions`, { type, value }),
  getInterviewQuestionThunk: (applicantInfo: ApplicantInfo) =>
    postData<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/interview-question`, applicantInfo),
  getReferenceEvaluateThunk: (applicantInfo: ApplicantDataInterface) =>
    postData<ReferenceEvaluate>(`${process.env.REACT_APP_FAKE_API_URL}/referenceEvaluate`, applicantInfo)
};

export const applicantReferenceInit = createAsyncThunk('applicantReferences/applicantReferenceInit', async () => {
  const data = await applicantAPI.applicantReferenceInit();
  return data && dispatch(setApplicantInfo(data));
});

export const getQuestionsThunk = createAsyncThunk(
  'applicantReferences/getQuestionsThunk',
  async (params: { type: string; value: string }) => {
    const data = await applicantAPI.getQuestionsThunk(params.type, params.value);
    return data && dispatch(setQuestions(data));
  }
);

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (params: ApplicantInfo, thunkAPI) => {
    const data = await applicantAPI.getInterviewQuestionThunk(params);
    return data && dispatch(setApplicantInfo(data));
  }
);

export const getReferenceEvaluateThunk = createAsyncThunk(
  'applicant/getReferenceEvaluateThunk',
  async (params: ApplicantDataInterface, thunkAPI) => {
    const data = await applicantAPI.getReferenceEvaluateThunk(params);
    return data && dispatch(setReferenceEvaluate(data));
  }
);
