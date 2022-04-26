// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { QuestionType, QuestionFilter } from 'types/question';

export const QUESTIONS_URL = `${process.env.REACT_APP_API_URL}/v1/operator/questions`;

const initialState: DefaultRootStateProps['question'] = {
  questions: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getQuestionsListSuccess(state, action) {
      state.questions = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    postQuestionSuccess(state, action) {
      state.questions.unshift(action.payload);
    },
    deleteQuestionSuccess(state, action) {
      state.questions = state.questions.filter((question) => question.id !== action.payload.id);
    },
    putQuestionSuccess(state, action) {
      console.log(111111);
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          return action.payload;
        }
        return question;
      });
    }
  }
});

export default slice.reducer;

export function getQuestionsList(filter?: QuestionFilter) {
  const queryParams = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') +
    (filter?.rank_id !== '' ? `&rank_id=${filter?.rank_id}` : '') +
    (filter?.department_id !== '' ? `&department_id=${filter?.department_id}` : '') +
    (filter?.language_id !== '' ? `&language_id=${filter?.language_id}` : '') +
    (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;
  return async () => {
    try {
      const response = await axios.get(`${QUESTIONS_URL}?${queryParams}`);
      dispatch(slice.actions.getQuestionsListSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function PostQuestion(question: QuestionType) {
  return async () => {
    try {
      const response = await axios.post(`${QUESTIONS_URL}`, question);
      dispatch(slice.actions.postQuestionSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function DeleteQuestion(question: QuestionType) {
  return async () => {
    try {
      const response = await axios.delete(`${QUESTIONS_URL}/${question.id}`);
      dispatch(slice.actions.deleteQuestionSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function PutQuestion(question: QuestionType) {
  return async () => {
    try {
      const response = await axios.put(`${QUESTIONS_URL}/${question.id}`, question);
      console.log('response.data.success', response.data.success);
      dispatch(slice.actions.putQuestionSuccess(response.data.success));
    } catch (error) {
      console.log('error', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
