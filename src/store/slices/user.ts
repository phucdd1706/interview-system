// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

import { DefaultRootStateProps } from 'types';

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
    }
  }
});

export default slice.reducer;
