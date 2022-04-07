import axiosServices from 'utils/axios';

const getListCandidate = (params: any, token: any) =>
  axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/users?${params}`, { headers: { Authorization: `Bearer ${token}` } });

export default getListCandidate;
