// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { RankFilter } from 'types/rank';

export const RANKS_URL = `${process.env.REACT_APP_API_URL}/v1/operator/ranks`;

const initialState: DefaultRootStateProps['rank'] = {
  error: null,
  ranks: []
};

const slice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getRanksListSuccess(state, action) {
      state.ranks = action.payload;
    }
  }
});

export default slice.reducer;

export function getRanksList(filter?: RankFilter) {
  let query: string;

  if (filter !== undefined) {
    query = `?search=${filter?.search}&status=${filter?.status}`;
  } else {
    query = '';
  }
  return async () => {
    try {
      const response = await axios.get(`${RANKS_URL}${query}`);
      dispatch(slice.actions.getRanksListSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
