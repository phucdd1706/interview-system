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

export function fetchCandidates({ params, callback }: Payload) {
  return async () => {
    const query = new URLSearchParams(params).toString();
    const response = await getListCandidate(query)
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

export function addCandidate({ params, callback }: Payload) {
  return async () => {
    const response = await createCandidate(params)
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

export function editCandidate({ id, params, callback }: Payload) {
  return async () => {
    const response = await updateCandidate(id, params)
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

export function removeCandidate({ id, callback }: Payload) {
  return async () => {
    const response = await deleteCandidate(id)
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
