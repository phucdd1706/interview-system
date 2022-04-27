// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { getListCandidate, createCandidate, updateCandidate } from 'api/history';
import { Payload } from 'types/history';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

const initialState: DefaultRootStateProps['history'] = {
  history: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getHistoryListSuccess(state, action) {
      state.history = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addHistorySuccess(state, action) {
      state.history.unshift(action.payload);
    },

    editHistorySuccess(state, action) {
      state.history = state.history.map((history) => {
        if (history.id === action.payload.id) {
          return action.payload;
        }
        return history;
      });
    }
  }
});

export default historySlice.reducer;

export function fetchCandidates({ params, callback }: Payload) {
  return async () => {
    const query = new URLSearchParams(params).toString();
    const response = await getListCandidate(query)
      .then((result) => {
        dispatch(historySlice.actions.getHistoryListSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(historySlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function addCandidate({ params, callback }: Payload) {
  return async () => {
    const response = await createCandidate(params)
      .then((result) => {
        dispatch(historySlice.actions.addHistorySuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(historySlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function editCandidate({ id, params, callback }: Payload) {
  return async () => {
    const response = await updateCandidate(id, params)
      .then((result) => {
        dispatch(historySlice.actions.editHistorySuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(historySlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}
