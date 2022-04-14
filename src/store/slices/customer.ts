// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { CustomerFilter } from 'types/customer';
import { UserProfile } from 'types/user-profile';

export const CUSTOMER_URL = `${process.env.REACT_APP_API_URL}/v1/client/users`;

const initialState: DefaultRootStateProps['customer'] = {
  customers: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getCustomerListSuccess(state, action) {
      state.customers = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },

    addCustomerSuccess(state, action) {
      state.customers.unshift(action.payload);
    },

    editCustomerSuccess(state, action) {
      if (action.payload.type === 1) {
        state.customers = state.customers.filter((customer) => customer.id !== action.payload.id);
      } else {
        state.customers = state.customers.map((customer) => {
          if (customer.id === action.payload.id) {
            return action.payload;
          }
          return customer;
        });
      }
    },

    deleteCustomerSuccess(state, action) {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getCustomerList(filter?: CustomerFilter) {
  const queryParams = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;

  return async () => {
    try {
      const response = await axios.get(`${CUSTOMER_URL}?${queryParams}`);
      dispatch(slice.actions.getCustomerListSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCustomer(customer: UserProfile) {
  return async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/operator/users`, customer);
      dispatch(slice.actions.addCustomerSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editCustomer(customer: UserProfile) {
  return async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/v1/operator/users/${customer.id}`, customer);
      dispatch(slice.actions.editCustomerSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCustomer(customer: UserProfile) {
  return async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/v1/operator/users/${customer.id}`);
      console.log(response);
      dispatch(slice.actions.deleteCustomerSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
