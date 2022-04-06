import { QLAdminResponse } from '../types/manage-admin';
import axios, { AxiosResponse } from 'axios';
import axiosServices from 'utils/axios';

export enum StatusAdmin {
  UNACTIVE = 0,
  ACTIVE = 1,
  BLOCK = 2
}
export const StatusOptionsAdmin: Array<{
  value: StatusAdmin;
  label: string;
}> = [
  {
    value: StatusAdmin.UNACTIVE,
    label: 'Chưa hoạt động'
  },
  {
    value: StatusAdmin.ACTIVE,
    label: 'Hoạt động'
  },
  {
    value: StatusAdmin.BLOCK,
    label: 'Khóa'
  }
];
export interface AdminParams {
  search: string | null;
  status?: StatusAdmin;
}
const QLAdmin_api = {
  dsAdmin: `v1/operator/users`
};

const QLAdminService = {
  getDsAdmin: async (params: AdminParams) => {
    const resp: AxiosResponse<QLAdminResponse> = await axiosServices.get(QLAdmin_api.dsAdmin, { params });
    console.log(1111, resp);
    return resp;
  }
};

export default QLAdminService;
