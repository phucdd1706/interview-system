// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ListUser from 'views/user/ListUser';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Administrator = Loadable(lazy(() => import('views/pages/administrator')));

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
<<<<<<< HEAD
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/user',
      element: <ListUser />
=======
      path: '/user/administrator',
      element: <Administrator />
>>>>>>> df7fed0f53a9efd81c28095d614c992054707a0e
    }
  ]
};

export default MainRoutes;
