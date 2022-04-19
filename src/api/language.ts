import axiosServices from 'utils/axios';

const getListLanguage = (params: any, token: any) =>
  axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/languages?${params}`, { headers: { Authorization: `Bearer ${token}` } });

const getOneLanguage = (id: any, token: any) =>
  axiosServices.get(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`, { headers: { Authorization: `Bearer ${token}` } });

const createLanguage = (params: any, token: any) =>
  axiosServices.post(`${process.env.REACT_APP_API_URL}/v1/operator/languages`, params, { headers: { Authorization: `Bearer ${token}` } });

const updateLanguage = (id: any, params: any, token: any) =>
  axiosServices.put(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`, params, {
    headers: { Authorization: `Bearer ${token}` }
  });

const deleteLanguage = (id: any, token: any) =>
  axiosServices.delete(`${process.env.REACT_APP_API_URL}/v1/operator/languages/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export { getListLanguage, getOneLanguage, createLanguage, updateLanguage, deleteLanguage };
