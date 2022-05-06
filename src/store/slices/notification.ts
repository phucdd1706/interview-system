/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Notification } from 'types/notification';
import NotificationsPage from 'views/pages/account/NotificationsPage';

const initialState: DefaultRootStateProps['notification'] = {
  error: null,
  notifications: {
    email: true,
    desktop: false,
    attempted: false
  }
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    editNotificationsSuccess(state, action) {
      state.notifications = action.payload;
    }
  }
});

export default slice.reducer;

export function editNotifications(notifications: Notification) {
  return async () => {
    try {
      // Send to API
      dispatch(slice.actions.editNotificationsSuccess(notifications));
      if (notifications.desktop === true) {
        NotificationsPage();
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
