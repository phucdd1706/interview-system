import { QLAdminResponse, QLAdmin } from '../types/manage-admin';
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
  dsAdmin: `v1/operator/users`,
  addAdmin: `v1/operator/users`,
  updateAdmin: (id: string) => `v1/operator/users/${id}`,
  delAdmin: (id: string) => `v1/operator/users/${id}`,
  detailAdmin: (id: string) => `v1/operator/users/${id}`
};

const QLAdminService = {
  getDsAdmin: async (params: AdminParams) => {
    const resp: AxiosResponse<QLAdminResponse> = await axiosServices.get(QLAdmin_api.dsAdmin, { params });
    console.log(1111, resp);
    return resp;
  },
  getDetailAdmin: async (id: string) => {
    const resp: AxiosResponse<QLAdminResponse> = await axiosServices.get(QLAdmin_api.detailAdmin(id));
    console.log(1111, resp);
    return resp;
  },
  postAdmin: async (data: QLAdmin) => {
    const resp = await axiosServices.post(QLAdmin_api.addAdmin, data);
    return resp;
  },
  putAdmin: async (id: string) => {
    const resp: AxiosResponse<QLAdminResponse> = await axiosServices.put(QLAdmin_api.updateAdmin(id));
    return resp;
  },
  deleteAdmin: async (id: string) => {
    const resp = await axiosServices.delete(QLAdmin_api.delAdmin(id));
    return resp;
  }
};

export default QLAdminService;
