import axiosServices from 'utils/axios';

const getListLanguage = (params: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/languages?${params}`);

const getAllLanguage = () => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/languages/all`);

const getOneLanguage = (id: any) => axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`);

const createLanguage = (params: any) => axiosServices.post(`${process.env.REACT_APP_API_URL}/v1/operator/languages`, params);

const updateLanguage = (id: any, params: any) => axiosServices.put(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`, params);

const deleteLanguage = (id: any) => axiosServices.delete(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`);

export { getListLanguage, getOneLanguage, createLanguage, updateLanguage, deleteLanguage, getAllLanguage };
