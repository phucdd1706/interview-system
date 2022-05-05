// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Payload, UserFilter } from 'types/user';

export const ADMINISTRATOR_URL = {
  getAdmin: `${process.env.REACT_APP_API_URL}/v1/operator/users`,
  postAdmin: `${process.env.REACT_APP_API_URL}/v1/operator/users`,
  putAdmin: (id: any) => `${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`,
  delAdmin: (id: any) => `${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`
};

const initialState: DefaultRootStateProps['user'] = {
  users: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getAdministratorListSuccess(state, action) {
      state.users = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addAdministratorSuccess(state, action) {
      state.users.unshift(action.payload);
    },

    editAdministratorSuccess(state, action) {
      if (action.payload.type === 2) {
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      } else {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
      }
    },

    deleteAdministratorSuccess(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getAdministratorList(filter?: UserFilter) {
  const queryParams = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;

  return async () => {
    try {
      const response = await axios.get(`${ADMINISTRATOR_URL.getAdmin}?${queryParams}`);
      dispatch(slice.actions.getAdministratorListSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addAdministrator(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(ADMINISTRATOR_URL.postAdmin, params)
      .then((result) => {
        dispatch(slice.actions.addAdministratorSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(resp);
    }
  };
}

export function editAdministrator(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(ADMINISTRATOR_URL.putAdmin(id), params)
      .then((result) => {
        dispatch(slice.actions.editAdministratorSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(resp);
    }
  };
}

export function deleteAdministrator(payload: Payload) {
  return async () => {
    const { id, callback } = payload;
    const resp = await axios
      .delete(ADMINISTRATOR_URL.delAdmin(id))
      .then((result) => {
        dispatch(slice.actions.deleteAdministratorSuccess(result.data.success));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(resp);
    }
  };
}
