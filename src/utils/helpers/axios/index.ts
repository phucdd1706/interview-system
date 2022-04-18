import axiosServices from 'utils/axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

export const postData = async <T>(url: string, data: any, alert?: string): Promise<T> => {
  const response = await axiosServices
    .post(url, data)
    .then((res: any) => {
      alert &&
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
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};

export const getData = async <T>(url: string, alert?: string): Promise<T> => {
  const response = await axiosServices
    .get(url)
    .then((res: any) => {
      alert &&
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
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};
