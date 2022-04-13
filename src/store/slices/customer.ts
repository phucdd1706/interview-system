// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { UserFilter } from 'types/user';
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

    editCustomerSuccess(state, action) {
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          return action.payload;
        }
        return customer;
      });
    }
  }
});

export default slice.reducer;

export function getCustomerList(filter?: UserFilter) {
  let query: string;

  if (filter !== undefined) {
    query = `?search=${filter?.search}&status=${filter?.status}`;
  } else {
    query = '';
  }

  return async () => {
    try {
      const response = await axios.get(`${CUSTOMER_URL}${query}`);
      dispatch(slice.actions.getCustomerListSuccess(response.data.success));
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
