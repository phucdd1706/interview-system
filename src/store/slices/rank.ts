// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { Payload } from 'types/history';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { RankFilter } from 'types/rank';

export const RANKS_URL = `${process.env.REACT_APP_API_URL}/v1/operator/ranks`;
export const RANKS_URL_ALL = `${process.env.REACT_APP_API_URL}/v1/ranks/all`;

const initialState: DefaultRootStateProps['rank'] = {
  ranks: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getRanksListSuccess(state, action) {
      state.ranks = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    postRankSuccess(state, action) {
      state.ranks.unshift(action.payload);
    },
    deleteRankSuccess(state, action) {
      state.ranks = state.ranks.filter((rank) => rank.id !== action.payload.id);
    },
    putRankSuccess(state, action) {
      if (action.payload.type === 1) {
        state.ranks = state.ranks.filter((rank) => rank.id !== action.payload.id);
      } else {
        state.ranks = state.ranks.map((rank) => {
          if (rank.id === action.payload.id) {
            return action.payload;
          }
          return rank;
        });
      }
    }
  }
});

export default slice.reducer;

export function getRanksList(filter?: RankFilter) {
  const queryParams = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;

  return async () => {
    try {
      const response = await axios.get(`${RANKS_URL}?${queryParams}`);
      dispatch(slice.actions.getRanksListSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRanksAll(payload: Payload) {
  return async () => {
    const { callback } = payload;
    const response = await await axios
      .get(`${RANKS_URL_ALL}`)
      .then((result) => result)
      .catch((err) => err);

    if (callback) {
      callback(response);
    }
  };
}

export function PostRank(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const response = await axios
      .post(`${RANKS_URL}`, params)
      .then((result) => {
        dispatch(slice.actions.postRankSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(response);
    }
  };
}

export function DeleteRank(payload: Payload) {
  return async () => {
    const { id, callback } = payload;
    const response = await axios
      .delete(`${RANKS_URL}/${id}`)
      .then((result) => {
        dispatch(slice.actions.deleteRankSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(response);
    }
  };
}

export function PutRank(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const response = await axios
      .put(`${RANKS_URL}/${id}`, params)
      .then((result) => {
        dispatch(slice.actions.putRankSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(response);
    }
  };
}
