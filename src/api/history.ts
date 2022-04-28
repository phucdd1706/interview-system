import axiosServices from 'utils/axios';

const getListCandidate = (params: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/client/candidates?${params}`);

const getOneCandidate = (id: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`);

const createCandidate = (params: any) => axiosServices.post(`${process.env.REACT_APP_API_URL}/v1/client/candidates`, params);

const updateCandidate = (id: any, params: any) => axiosServices.put(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, params);

export { getListCandidate, getOneCandidate, createCandidate, updateCandidate };
