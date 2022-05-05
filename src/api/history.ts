import axiosServices from 'utils/axios';
import { Candidates } from 'types/history';

const URL_API = `${process.env.REACT_APP_API_URL}/v1/client/candidates`;

const getListCandidate = (params: string) => axiosServices.get(`${URL_API}?${params}`);

const getOneCandidate = (id: number | string | undefined) => axiosServices.get(`${URL_API}/${id}`);

const createCandidate = (params: Candidates) => axiosServices.post(`${URL_API}`, params);

const updateCandidate = (id: number | string | undefined, params: Candidates) => axiosServices.put(`${URL_API}/${id}`, params);

export { getListCandidate, getOneCandidate, createCandidate, updateCandidate };
