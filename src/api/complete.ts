import axiosServices from 'utils/axios';

const getListCandidate = (params: any, token: any) =>
  axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/users?${params}`, { headers: { Authorization: `Bearer ${token}` } });

const getOneCandidate = (id: any, token: any) =>
  axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });

const createCandidate = (params: any, token: any) =>
  axiosServices.post(`${process.env.REACT_APP_API_URL}/v1/operator/users`, params, { headers: { Authorization: `Bearer ${token}` } });

const updateCandidate = (id: any, params: any, token: any) =>
  axiosServices.put(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`, params, { headers: { Authorization: `Bearer ${token}` } });

const deleteCandidate = (id: any, token: any) =>
  axiosServices.delete(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export { getListCandidate, getOneCandidate, createCandidate, updateCandidate, deleteCandidate };
