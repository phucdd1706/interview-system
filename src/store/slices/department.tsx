// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Department, DepartmentFilter } from 'types/department';

export const DEPARTMENT_URL = {
  getDepartmen: `${process.env.REACT_APP_API_URL}/v1/operator/department`,
  postDepartment: `${process.env.REACT_APP_API_URL}/v1/operator/department`,
  putDepartment: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/department/${id}`,
  delDepartment: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/department/${id}`,
  getDetailDepartment: (id: string) => `${process.env.REACT_APP_API_URL}/v1/operator/department/${id}`
};

const initialState: DefaultRootStateProps['department'] = {
  error: null,
  department: []
};

const slice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getDepartmentListSuccess(state, action) {
      state.department = action.payload;
    },
    postDepartmentSuccess(state, action) {
      state.department = action.payload;
    },
    putDepartmentSuccess(state, action) {
      state.department = action.payload;
    },
    delDepartmentSuccess(state, action) {
      state.department = action.payload;
    }
  }
});

export default slice.reducer;

export function getDepartmentList(filter?: DepartmentFilter) {
  return async () => {
    try {
      const resp = await axios.get(`${DEPARTMENT_URL.getDepartmen}?search=${filter?.search}&status=${filter?.status}`);
      dispatch(slice.actions.getDepartmentListSuccess(resp?.data?.success?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postDepartment(data?: Department) {
  return async () => {
    try {
      const resp = await axios.post(DEPARTMENT_URL.getDepartmen, data);
      dispatch(slice.actions.postDepartmentSuccess(resp?.data?.success?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function putDepartment(id: string, data?: Department) {
  return async () => {
    try {
      const resp = await axios.put(DEPARTMENT_URL.putDepartment(id), data);
      dispatch(slice.actions.putDepartmentSuccess(resp?.data?.success?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delDepartment(id: string) {
  return async () => {
    try {
      const resp = await axios.delete(DEPARTMENT_URL.delDepartment(id));
      dispatch(slice.actions.delDepartmentSuccess(resp?.data?.success?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getDetailDepartment(id: string) {
  return async () => {
    try {
      const resp = await axios.get(DEPARTMENT_URL.getDetailDepartment(id));
      dispatch(slice.actions.getDepartmentListSuccess(resp?.data?.success?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
