// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { UserFilter } from 'types/user';
import { UserProfile } from 'types/user-profile';

export const CUSTOMER_URL = `${process.env.REACT_APP_API_URL}/v1/client/users`;

const initialState: DefaultRootStateProps['user'] = {
  error: null,
  users: []
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getCusomterListSuccess(state, action) {
      state.users = action.payload;
    },
    postCustomerSuccess(state, action) {
      state.users = action.payload;
    },
    deleteCustomerSuccess(state, action) {
      state.users = action.payload;
    },
    editCustomerSuccess(state, action) {
      state.users = action.payload;
    }
  }
});

export default slice.reducer;

export function getCustomerList(filter?: UserFilter) {
  return async () => {
    try {
      const response = await axios.get(`${CUSTOMER_URL}?search=${filter?.search}&status=${filter?.status}`);
      dispatch(slice.actions.getCusomterListSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postCustomer(data: UserProfile) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/operator/users`, data);
      dispatch(slice.actions.postCustomerSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteCustomer(id: string) {
  return async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`);
      dispatch(slice.actions.deleteCustomerSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function EditCustomer(id: string, data: UserProfile) {
  return async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`, data);
      dispatch(slice.actions.editCustomerSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
