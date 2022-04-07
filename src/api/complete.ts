import axios from 'axios';

const getListCandidate = (params: any, token: any) => {
  console.log('params', params);
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/v1/operator/users?${params}`,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default getListCandidate;
