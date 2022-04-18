import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { getSeverityType, getErrMessage } from './errHandle';

export const alertRequestError = (errResponse: any): void => {
  const severityType = getSeverityType(errResponse.status);
  const message = getErrMessage(errResponse);
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
