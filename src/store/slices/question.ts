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
      if (action.payload.type === 1) {
        state.questions = state.questions.filter((question) => question.id !== action.payload.id);
      } else {
        state.questions = state.questions.map((question) => {
          if (question.id === action.payload.id) {
            return action.payload;
          }
          return question;
        });
      }
    }
  }
});

export default slice.reducer;

export function getQuestionsList(filter?: QuestionFilter) {
  const queryParams = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
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

// export function DeleteRank(rank: RankType) {
//   return async () => {
//     try {
//       const response = await axios.delete(`${RANKS_URL}/${rank.id}`);
//       dispatch(slice.actions.deleteRankSuccess(response.data.success));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function PutRank(rank: RankType) {
//   return async () => {
//     try {
//       const response = await axios.put(`${RANKS_URL}/${rank.id}`, rank);
//       dispatch(slice.actions.putRankSuccess(response.data.success));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
