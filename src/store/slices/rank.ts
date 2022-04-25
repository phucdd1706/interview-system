// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { Payload } from 'types/complete';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { RankType, RankFilter } from 'types/rank';

export const RANKS_URL = `${process.env.REACT_APP_API_URL}/v1/operator/ranks`;

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
      .get(`${RANKS_URL}/all`)
      .then((result) => result)
      .catch((err) => err);

    if (callback) {
      callback(response);
    }
  };
}

export function PostRank(rank: RankType) {
  return async () => {
    try {
      const response = await axios.post(`${RANKS_URL}`, rank);
      dispatch(slice.actions.postRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function DeleteRank(rank: RankType) {
  return async () => {
    try {
      const response = await axios.delete(`${RANKS_URL}/${rank.id}`);
      dispatch(slice.actions.deleteRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function PutRank(rank: RankType) {
  return async () => {
    try {
      const response = await axios.put(`${RANKS_URL}/${rank.id}`, rank);
      dispatch(slice.actions.putRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
