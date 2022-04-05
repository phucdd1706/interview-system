// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const AddEmployeeInfo = Loadable(lazy(() => import('views/add-employee-info')));

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
      path: '/employee',
      element: <AddEmployeeInfo />
    }
  ]
};

export default MainRoutes;
