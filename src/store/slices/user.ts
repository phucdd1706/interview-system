import { Administrator, UserFilter } from '../../types/user';
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

export const ADMINISTRATOR_URL = {
  getAdmin: `${process.env.REACT_APP_API_URL}/v1/operator/users`,
  postAdmin: `${process.env.REACT_APP_API_URL}/v1/operator/users`,
  putAdmin: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`,
  detailAdmin: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`,
  delAdmin: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`
};

const initialState: DefaultRootStateProps['user'] = {
  error: null,
  users: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getAdministratorListSuccess(state, action) {
      state.users = action.payload;
    },
    postAdministratorSuccess(state, action) {
      state.users = action.payload;
    },
    putAdministratorSuccess(state, action) {
      state.users = action.payload;
    },
    delAdministratorSuccess(state, action) {
      state.users = action.payload;
    }
  }
});

export default slice.reducer;

export function getAdministratorList(filter?: UserFilter) {
  return async () => {
    try {
      const response = await axios.get(`${ADMINISTRATOR_URL.getAdmin}?search=${filter?.search}&status=${filter?.status}`);
      dispatch(slice.actions.getAdministratorListSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postAdministrator(data?: Administrator) {
  return async () => {
    try {
      await axios.post(`${ADMINISTRATOR_URL.postAdmin}`, data);
      dispatch(slice.actions.postAdministratorSuccess);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function putAdministrator(id: string, data?: Administrator) {
  return async () => {
    try {
      const response = await axios.put(ADMINISTRATOR_URL.putAdmin(id), data);
      dispatch(slice.actions.putAdministratorSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getDetailAdministrator() {
  return async (id: string) => {
    try {
      const response = await axios.get(ADMINISTRATOR_URL.detailAdmin(id));
      dispatch(slice.actions.getAdministratorListSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delAdministrator(id: string) {
  return async () => {
    try {
      const response = await axios.delete(ADMINISTRATOR_URL.delAdmin(id));
      dispatch(slice.actions.delAdministratorSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
