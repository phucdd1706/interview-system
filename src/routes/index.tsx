// THIRD-PARTY
import { useRoutes } from 'react-router-dom';

// PROJECT IMPORTS
import MainRoutes from 'routes/MainRoutes';
import LoginRoutes from 'routes/LoginRoutes';
import AuthenticationRoutes from 'routes/AuthenticationRoutes';
import notFoundRoute from './NotFound';

export default function ThemeRoutes() {
  console.log(MainRoutes);
  return useRoutes([MainRoutes, LoginRoutes, AuthenticationRoutes, notFoundRoute]);
}
