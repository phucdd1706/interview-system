// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { getListCandidate, createCandidate, updateCandidate, deleteCandidate } from 'api/complete';
import { Payload } from 'types/complete';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

const initialState: DefaultRootStateProps['complete'] = {
  complete: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const completeSlice = createSlice({
  name: 'complete',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getCompleteListSuccess(state, action) {
      state.complete = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addCompleteSuccess(state, action) {
      state.complete.unshift(action.payload);
    },

    editCompleteSuccess(state, action) {
      state.complete = state.complete.map((complete) => {
        if (complete.id === action.payload.id) {
          return action.payload;
        }
        return complete;
      });
    },

    deleteCompleteSuccess(state, action) {
      state.complete = state.complete.filter((complete) => complete.id !== action.payload.id);
    }
  }
});

export default completeSlice.reducer;

export function fetchCandidates(payload: Payload) {
  return async () => {
    const { params, token, callback } = payload;
    const query = new URLSearchParams(params).toString();
    const response = await getListCandidate(query, token)
      .then((result) => {
        dispatch(completeSlice.actions.getCompleteListSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(completeSlice.actions.hasError(err));
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
        dispatch(completeSlice.actions.addCompleteSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(completeSlice.actions.hasError(err));
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
        dispatch(completeSlice.actions.editCompleteSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(completeSlice.actions.hasError(err));
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
        dispatch(completeSlice.actions.deleteCompleteSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(completeSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}
