// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { Payload } from 'types/complete';

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
  pageCount: 0,
  currentPage: 1,
  department: [],
  error: []
};

const slice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getDepartmentListSuccess(state, action) {
      state.department = action.payload.data;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postDepartmentSuccess(state, action) {
      state.department.unshift(action.payload);
    },
    putDepartmentSuccess(state, action) {
      state.department = state.department.map((departments) => {
        if (departments.id === action.payload.id) {
          return action.payload;
        }
        return departments;
      });
    },
    delDepartmentSuccess(state, action) {
      state.department = state.department.filter((departments) => departments.id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getDepartmentList(filter?: DepartmentFilter) {
  const params = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${DEPARTMENT_URL.getDepartmen}?${params}`);
      dispatch(slice.actions.getDepartmentListSuccess(resp.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDepartmentsAll(payload: Payload) {
  return async () => {
    const { callback } = payload;
    const response = await await axios
      .get(`${DEPARTMENT_URL.postDepartment}/all`)
      .then((result) => result)
      .catch((err) => err);

    if (callback) {
      callback(response);
    }
  };
}

export function postDepartment(data?: Department) {
  return async () => {
    try {
      const resp = await axios.post(`${DEPARTMENT_URL.postDepartment}`, data);
      dispatch(slice.actions.postDepartmentSuccess(resp.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function putDepartment(depart: Department) {
  return async () => {
    try {
      const resp = await axios.put(`${process.env.REACT_APP_API_URL}/v1/operator/department/${depart.id}`, depart);
      dispatch(slice.actions.putDepartmentSuccess(resp.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delDepartment(depart: Department) {
  return async () => {
    try {
      const resp = await axios.delete(`${process.env.REACT_APP_API_URL}/v1/operator/department/${depart.id}`);
      dispatch(slice.actions.delDepartmentSuccess(resp.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
