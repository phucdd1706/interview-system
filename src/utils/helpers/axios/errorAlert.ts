import { AxiosError } from 'axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { getSeverityType, getErrMessage } from './errHandle';

export const alertRequestError = (errResponse: AxiosError): void => {
  const severityType = (errResponse.response && getSeverityType(errResponse.response.status)) || 'error';
  const message = (errResponse.response && getErrMessage(errResponse.response)) || errResponse.message;
  dispatch(
    openSnackbar({
      open: true,
      severity: severityType,
      message,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: {
        color: severityType
      },
      close: false
    })
  );
};

export const alertRequestSuccess = (alert: string): void => {
  dispatch(
    openSnackbar({
      open: true,
      severity: 'success',
      message: alert,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: {
        color: 'success'
      },
      close: false
    })
  );
};

export const alertError = (alert: string): void => {
  dispatch(
    openSnackbar({
      open: true,
      severity: 'error',
      message: alert,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: {
        color: 'error'
      },
      close: false
    })
  );
};
