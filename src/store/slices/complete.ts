// PROJECT IMPORTS

// THIRD-PARTY
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListCandidate, getOneCandidate, createCandidate, updateCandidate, deleteCandidate } from 'api/complete';
import { Payload } from 'types/complete';

const initialState = {
  data: {
    list: [],
    pagination: []
  },
  info: {},
  query: {},
  filter: {}
};

export const fetchCandidates: any = createAsyncThunk('complete/fetchList', async (payload: Payload) => {
  const { params, token, callback } = payload;
  const query = new URLSearchParams(params).toString();
  const response = await getListCandidate(query, token);
  if (callback) {
    callback(response);
  }
  return response.data.success.data;
});

export const getOne: any = createAsyncThunk('complete/getOne', async (payload: Payload) => {
  const { id, token, callback } = payload;
  const response = await getOneCandidate(id, token);
  if (callback) {
    callback(response);
  }
  return response.data.success.data;
});

export const removeCandidate: any = createAsyncThunk('complete/delete', async (payload: Payload) => {
  const { id, token, callback } = payload;
  const response = await deleteCandidate(id, token);
  if (callback) {
    callback(response);
  }
  return id;
});

const completeSlice = createSlice({
  name: 'complete',
  initialState,
  reducers: {
    save: (state, action) => ({
      ...state,
      data: {
        list: action.payload.list,
        pagination: action.payload.pagination
      },
      info: {}
    }),
    info: (state, action) => ({
      ...state,
      info: action.payload
    }),
    filter: (state, action) => ({
      ...state,
      filter: action.payload
    }),
    query: (state, action) => ({
      ...state,
      query: action.payload
    })
  },
  extraReducers: {
    [fetchCandidates.fulfilled]: (state, action) => {
      console.log('success', action.payload);
      state.data.list = action.payload;
    },
    [fetchCandidates.rejected]: (state, action) => {
      console.log('error', action.error);
    },

    [getOne.fulfilled]: (state, action) => {
      console.log('success', action.payload);
      state.info = action.payload;
    },
    [getOne.rejected]: (state, action) => {
      console.log('error', action.error);
    },

    [removeCandidate.fulfilled]: (state, action) => {
      console.log('success', action.payload);
      state.data.list = state.data.list.filter((item: any) => item.id !== action.payload);
    },
    [removeCandidate.rejected]: (state, action) => {
      console.log('error', action.error);
    }
  }
});

export const { save, info, filter, query } = completeSlice.actions;

export default completeSlice.reducer;
