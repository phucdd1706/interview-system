// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Rank, RankFilter } from 'types/rank';

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
      // state.customers = action.payload.data;
      // state.pageCount = action.payload.last_page;
      // state.currentPage = action.payload.current_page;
    },

    postRankSuccess(state, action) {
      state.ranks.unshift(action.payload);
    },
    deleteRankSuccess(state, action) {
      state.ranks = action.payload;
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
    },
    getRankSuccess(state, action) {
      state.ranks = action.payload;
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

export function PostRank(data?: Rank) {
  return async () => {
    try {
      const response = await axios.post(`${RANKS_URL}`, data);
      dispatch(slice.actions.postRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function DeleteRank(rank: Rank) {
  return async () => {
    try {
      const response = await axios.delete(`${RANKS_URL}/${rank.id}`);
      dispatch(slice.actions.deleteRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function PutRank(rankId: string, data?: Rank) {
  return async () => {
    try {
      const response = await axios.put(`${RANKS_URL}/${rankId}`, data);
      dispatch(slice.actions.putRankSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function GetDetailRank(rankId: string) {
  return async () => {
    try {
      const response = await axios.get(`${RANKS_URL}/${rankId}`);
      dispatch(slice.actions.getRankSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
