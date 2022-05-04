import { AxiosResponse } from 'axios';

const errorCode = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  444: 'Connection Closed Without Response',
  500: 'Internal Server Error',
  notCatch: 'Something went wrong'
};

export const getSeverityType = (errStatus: number | undefined): 'error' | 'warning' => {
  if (errStatus === 401) {
    return 'error';
  }
  return 'error';
};

export const getErrMessage = (errResponse: AxiosResponse<{ message: string; errors: any }>): string => {
  if (errResponse.status === 404) {
    return `[${getSeverityType(errResponse.status).toUpperCase()}] ${errResponse.statusText}: Could not find the resource`;
  }
  if (errResponse.status === 401) {
    return `[${getSeverityType(errResponse.status).toUpperCase()}] ${errorCode[401]}: Username or password is incorrect`;
  }
  if (errResponse) {
    return `[${getSeverityType(errResponse.status).toUpperCase()}] ${errResponse.statusText} ${
      errResponse.data && errResponse.data.message ? `: ${errResponse.data.message}` : ''
    }`;
  }
  return '2';
};
