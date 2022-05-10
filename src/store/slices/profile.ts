// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Profile, ChangePassword, Payload } from 'types/profile';

export const PROFILE_URL = `${process.env.REACT_APP_API_URL}/v1/profile`;

const initialState: DefaultRootStateProps['profile'] = {
  error: null,
  profiles: []
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    editProfileSuccess(state, action) {
      state.profiles = action.payload;
    },
    changePasswordSuccess(state, action) {
      state.profiles = action.payload;
    }
  }
});

export default slice.reducer;

export function editProfile(profile: Profile) {
  return async () => {
    try {
      const response = await axios.put(`${PROFILE_URL}`, profile);
      dispatch(slice.actions.editProfileSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function changeNewPassword(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const res = await axios
      .put(`${PROFILE_URL}`, params)
      .then((result) => {
        dispatch(slice.actions.changePasswordSuccess(result.data.success));
        return result;
      })
      .catch((err) => {
        dispatch(slice.actions.hasError(err));
        return err;
      });
    if (callback) {
      callback(res);
    }
  };
}
