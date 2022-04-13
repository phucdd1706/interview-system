// PROJECT IMPORTS
import { ApplicantDataInterface, ApplicantInfo, ReferenceEvaluate } from 'types/applicantData';
import { QuestionInterface, QuestionStackInterface } from 'types/interviewQuestion';
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
    notes: '',
    experiences: [],
    applyPosition: []
  },
  interviewQuestions: [
    // {
    //   type: 'Basic',
    //   questions: [
    //     {
    //       questionId: '1',
    //       question: 'sdfdvbvcxb?',
    //
    //
    //     },
    //     {
    //       questionId: '2',
    //       question: 'What is dsfasdfqwer age?',
    //
    //
    //     },
    //     {
    //       questionId: '3',
    //       question: 'Expecteasdfwerd salary?',
    //
    //
    //     }
    //   ]
    // },
    // {
    //   type: 'React J1',
    //   questions: [
    //     {
    //       questionId: '4',
    //       question: 'What is ReacqwerqwertJS?',
    //
    //
    //     },
    //     {
    //       questionId: '5',
    //       question: 'What is sdfqweRedux?',
    //
    //
    //     },
    //     {
    //       questionId: '6',
    //       question: 'What qweris J1?',
    //
    //
    //     },
    //     {
    //       questionId: '9',
    //       question: 'explain abfsfqewout React lifecycle?',
    //
    //
    //     }
    //   ]
    // },
    // {
    //   type: 'Advanced',
    //   questions: [
    //     {
    //       questionId: '7',
    //       question: 'How to increaseqwer performance?',
    //
    //
    //     },
    //     {
    //       questionId: '8',
    //       question: 'How to incrfgwqerease security?',
    //
    //
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
      Object.assign(state, action.payload);
    },
    setReferenceEvaluate(state, action: { payload: ReferenceEvaluate }) {
      Object.assign(state, { referenceEvaluate: action.payload });
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

// ASYNC ACTIONS

const postData = async <T>(url: string, data: any): Promise<T> => {
  const response = await axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => err);
  console.log(response);
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
  applicantReferenceInit: () => getData<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/applicant/reference/init`),
  getInterviewQuestionThunk: (applicantInfo: ApplicantInfo) =>
    postData<ApplicantDataInterface>(`${process.env.REACT_APP_FAKE_API_URL}/interview-question`, applicantInfo),
  getReferenceEvaluateThunk: (applicantInfo: ApplicantDataInterface) =>
    postData<ReferenceEvaluate>(`${process.env.REACT_APP_FAKE_API_URL}/referenceEvaluate`, applicantInfo)
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

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (params: ApplicantInfo, thunkAPI) => {
    const data = await applicantAPI.getInterviewQuestionThunk(params);
    data.interviewQuestions.map((item: QuestionStackInterface) => {
      item.questions.map((question: QuestionInterface) => {
        question.answerScore = '';
        question.notes = '';
        return question;
      });
      return item;
    });
    return dispatch(setApplicantInfo(data));
  }
);

export const getReferenceEvaluateThunk = createAsyncThunk(
  'applicant/getReferenceEvaluateThunk',
  async (params: ApplicantDataInterface, thunkAPI) => {
    const data = await applicantAPI.getReferenceEvaluateThunk(params);
    return dispatch(setReferenceEvaluate(data));
  }
);
