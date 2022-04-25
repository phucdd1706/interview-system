import axiosServices from 'utils/axios';
import { alertRequestSuccess } from './errorAlert';

export const axiosPost = async <T>(url: string, data: any, alert?: string): Promise<T> => {
  const response = await axiosServices
    .post(url, data)
    .then((res: any) => {
      alert && alertRequestSuccess(alert);
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};

export const axiosGet = async <T>(url: string, alert?: string): Promise<T> => {
  const response = await axiosServices
    .get(url)
    .then((res: any) => {
      alert && alertRequestSuccess(alert);
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};

export const axiosPut = async <T>(url: string, data: any, alert?: string): Promise<T> => {
  const response = await axiosServices
    .put(url, data)
    .then((res: any) => {
      alert && alertRequestSuccess(alert);
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};

export const axiosDelete = async <T>(url: string, alert?: string): Promise<T> => {
  const response = await axiosServices
    .delete(url)
    .then((res: any) => {
      alert && alertRequestSuccess(alert);
      return res.data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return response;
};
