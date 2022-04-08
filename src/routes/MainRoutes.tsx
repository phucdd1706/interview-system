// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Administrator = Loadable(lazy(() => import('views/pages/administrator')));
const Customer = Loadable(lazy(() => import('views/pages/customer')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/dashboard/analytics',
      element: <Dashboard />
    },
    {
      path: '/user/administrator',
      element: <Administrator />
    },
    {
      path: '/user/customer',
      element: <Customer />
    }
  ]
};

export default MainRoutes;
