// THIRD-PARTY
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';

// PROJECT IMPORTS
import accountReducer from 'store/accountReducer';
import axios from 'utils/axios';
import Loader from 'ui-component/Loader';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';
import { KeyedObject } from 'types';
import { LOGIN, LOGOUT } from 'store/actions';

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/v1/login`;
export const ME_URL = `${process.env.REACT_APP_API_URL}/v1/me`;

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setUser = (user?: any | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get(ME_URL);
          state.user = response.data.success;
          const user = response.data.success;

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post(LOGIN_URL, { email, password });
    const { token, user } = response.data.success;
    setSession(token);
    setUser(user);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    setUser(null);
    dispatch({ type: LOGOUT });
  };

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
