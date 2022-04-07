// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Qlrank from 'views/pages/qlrank/index';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/views/pages/qlrank/index',
      element: <Qlrank />
    }
  ]
};

export default MainRoutes;
