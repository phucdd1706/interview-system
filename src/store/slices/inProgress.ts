// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { getListCandidate, createCandidate, updateCandidate, deleteCandidate } from 'api/complete';
import { Payload } from 'types/complete';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

const initialState: DefaultRootStateProps['inProgress'] = {
  inProgress: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const inProgressSlice = createSlice({
  name: 'inProgress',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getInProgressListSuccess(state, action) {
      state.inProgress = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addInProgressSuccess(state, action) {
      state.inProgress.unshift(action.payload);
    },

    editInProgressSuccess(state, action) {
      state.inProgress = state.inProgress.map((inProgress) => {
        if (inProgress.id === action.payload.id) {
          return action.payload;
        }
        return inProgress;
      });
    },

    deleteInProgressSuccess(state, action) {
      state.inProgress = state.inProgress.filter((inProgress) => inProgress.id !== action.payload.id);
    }
  }
});

export default inProgressSlice.reducer;

export function fetchCandidates(payload: Payload) {
  return async () => {
    const { params, token, callback } = payload;
    const query = new URLSearchParams(params).toString();
    const response = await getListCandidate(query, token)
      .then((result) => {
        dispatch(inProgressSlice.actions.getInProgressListSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(inProgressSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function addCandidate(payload: Payload) {
  return async () => {
    const { params, token, callback } = payload;
    const response = await createCandidate(params, token)
      .then((result) => {
        dispatch(inProgressSlice.actions.addInProgressSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(inProgressSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function editCandidate(payload: Payload) {
  return async () => {
    const { id, params, token, callback } = payload;
    const response = await updateCandidate(id, params, token)
      .then((result) => {
        dispatch(inProgressSlice.actions.editInProgressSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(inProgressSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function removeCandidate(payload: Payload) {
  return async () => {
    const { id, token, callback } = payload;
    const response = await deleteCandidate(id, token)
      .then((result) => {
        dispatch(inProgressSlice.actions.deleteInProgressSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(inProgressSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}
