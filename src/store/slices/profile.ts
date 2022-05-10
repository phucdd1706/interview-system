import { ME_URL } from 'contexts/JWTContext';
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Profile, ChangePassword } from 'types/profile';

export const PROFILE_URL = `${process.env.REACT_APP_API_URL}/v1/profile`;

const initialState: DefaultRootStateProps['profile'] = {
  error: null,
  profiles: [],
  userProfile: null
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
    },
    getProfileSuccess(state, action) {
      state.userProfile = action.payload;
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

export function changeNewPassword(changePassword: ChangePassword) {
  return async () => {
    try {
      const response = await axios.put(`${PROFILE_URL}`, changePassword);
      dispatch(slice.actions.changePasswordSuccess(response.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProfile() {
  return async () => {
    try {
      const response = await axios.get(ME_URL);
      dispatch(slice.actions.getProfileSuccess(response.data.success));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
