// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { getListLanguage, createLanguage, updateLanguage, deleteLanguage } from 'api/language';
import { Payload } from 'types/language';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

const initialState: DefaultRootStateProps['language'] = {
  language: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const completeSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getCompleteListSuccess(state, action) {
      state.language = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addCompleteSuccess(state, action) {
      state.language.unshift(action.payload);
    },

    editCompleteSuccess(state, action) {
      state.language = state.language.map((language) => {
        if (language.id === action.payload.id) {
          return action.payload;
        }
        return language;
      });
    },

    deleteCompleteSuccess(state, action) {
      state.language = state.language.filter((language) => language.id !== action.payload.id);
    }
  }
});

export default completeSlice.reducer;

export function fetchLanguages(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const query = new URLSearchParams(params).toString();
    const response = await getListLanguage(query)
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

export function addLanguage(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const response = await createLanguage(params)
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

export function editLanguage(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const response = await updateLanguage(id, params)
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

export function removeLanguage(payload: Payload) {
  return async () => {
    const { id, callback } = payload;
    const response = await deleteLanguage(id)
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
