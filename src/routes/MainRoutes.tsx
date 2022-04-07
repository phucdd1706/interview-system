// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Complete = Loadable(lazy(() => import('views/complete/complete')));
const Inprogress = Loadable(lazy(() => import('views/inProgress/inprogress')));

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
      path: '/complete',
      element: <Complete />
    },
    {
      path: '/inprogress',
      element: <Inprogress />
    }
  ]
};

export default MainRoutes;
