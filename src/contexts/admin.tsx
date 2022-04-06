import { QLAdminResponse } from '../types/manage-admin';
import axios, { AxiosResponse } from 'axios';
import axiosServices from 'utils/axios';

export interface AdminParams {
  search: string | null;
  status?: number | null;
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
