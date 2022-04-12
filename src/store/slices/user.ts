import { Administrator, UserFilter } from '../../types/user';
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';

export const ADMINISTRATOR_URL = `${process.env.REACT_APP_API_URL}/v1/operator/users`;

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
    }
  }
});

export default slice.reducer;

export function getAdministratorList(filter?: UserFilter) {
  return async () => {
    try {
      const response = await axios.get(`${ADMINISTRATOR_URL}?search=${filter?.search}&status=${filter?.status}`);
      dispatch(slice.actions.getAdministratorListSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postAdministrator(data?: Administrator) {
  return async () => {
    try {
      await axios.post(ADMINISTRATOR_URL, data);
      dispatch(slice.actions.postAdministratorSuccess);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
