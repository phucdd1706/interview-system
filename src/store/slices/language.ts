// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { getListLanguage, createLanguage, updateLanguage, deleteLanguage, getAllLanguage } from 'api/language';
import { Payload } from 'types/language';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

const initialState: DefaultRootStateProps['language'] = {
  language: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getLanguageListSuccess(state, action) {
      state.language = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addLanguageSuccess(state, action) {
      state.language.unshift(action.payload);
    },

    editLanguageSuccess(state, action) {
      state.language = state.language.map((language) => {
        if (language.id === action.payload.id) {
          return action.payload;
        }
        return language;
      });
    },

    deleteLanguageSuccess(state, action) {
      state.language = state.language.filter((language) => language.id !== action.payload.id);
    }
  }
});

export default languageSlice.reducer;

export function fetchLanguages({ params, callback }: Payload) {
  return async () => {
    const query = new URLSearchParams(params).toString();
    const response = await getListLanguage(query)
      .then((result) => {
        dispatch(languageSlice.actions.getLanguageListSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(languageSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function getLanguagesAll(payload: Payload) {
  return async () => {
    const { callback } = payload;
    const response = await getAllLanguage()
      .then((result) => result)
      .catch((err) => err);

    if (callback) {
      callback(response);
    }
  };
}

export function addLanguage({ params, callback }: Payload) {
  return async () => {
    const response = await createLanguage(params)
      .then((result) => {
        dispatch(languageSlice.actions.addLanguageSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(languageSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function editLanguage({ id, params, callback }: Payload) {
  return async () => {
    const response = await updateLanguage(id, params)
      .then((result) => {
        dispatch(languageSlice.actions.editLanguageSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(languageSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}

export function removeLanguage({ id, callback }: Payload) {
  return async () => {
    const response = await deleteLanguage(id)
      .then((result) => {
        dispatch(languageSlice.actions.deleteLanguageSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(languageSlice.actions.hasError(err));
        return err;
      });

    if (callback) {
      callback(response);
    }
  };
}
