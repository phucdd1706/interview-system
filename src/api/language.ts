import axiosServices from 'utils/axios';
import { Languages } from 'types/language';

const URL_API = `${process.env.REACT_APP_API_URL}/v1/operator/languages`;

const getListLanguage = (params: string) => axiosServices.get(`${URL_API}?${params}`);

const getAllLanguage = () => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/languages/all`);

const getOneLanguage = (id: number | string | undefined) => axiosServices.get(`${URL_API}/${id}`);

const createLanguage = (params: Languages) => axiosServices.post(`${URL_API}`, params);

const updateLanguage = (id: number | string | undefined, params: Languages) => axiosServices.put(`${URL_API}/${id}`, params);

const deleteLanguage = (id: number | string | undefined) => axiosServices.delete(`${URL_API}/${id}`);

export { getListLanguage, getOneLanguage, createLanguage, updateLanguage, deleteLanguage, getAllLanguage };
