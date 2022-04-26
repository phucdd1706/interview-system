import axiosServices from 'utils/axios';

const getListCandidate = (params: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/users?${params}`);

const getOneCandidate = (id: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`);

const createCandidate = (params: any) => axiosServices.post(`${process.env.REACT_APP_API_URL}/v1/operator/users`, params);

const updateCandidate = (id: any, params: any) => axiosServices.put(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`, params);

const deleteCandidate = (id: any) => axiosServices.delete(`${process.env.REACT_APP_API_URL}/v1/operator/users/${id}`);

export { getListCandidate, getOneCandidate, createCandidate, updateCandidate, deleteCandidate };
