// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const QlAdmin = Loadable(lazy(() => import('views/pages/quan-ly-admin/ds-admin')));

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
      path: '/ds-admin',
      element: <QlAdmin />
    }
  ]
};

export default MainRoutes;
