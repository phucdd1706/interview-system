// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const QlAdmin = Loadable(lazy(() => import('views/pages/admin/list-admin')));
const Department = Loadable(lazy(() => import('views/pages/department/list-department')));

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
    },
    {
      path: '/ds-department',
      element: <Department />
    }
  ]
};

export default MainRoutes;
