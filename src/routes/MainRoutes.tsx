// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Administrator = Loadable(lazy(() => import('views/pages/administrator')));
const Customer = Loadable(lazy(() => import('views/pages/customer')));
const Profile = Loadable(lazy(() => import('views/pages/account')));
const Ranks = Loadable(lazy(() => import('views/pages/ranks')));
const AddNewApplicant = Loadable(lazy(() => import('views/pages/add-new-applicant-reference')));
const Interview = Loadable(lazy(() => import('views/pages/interview')));

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
    },
    {
      path: 'ranks',
      element: <Ranks />
    },
    {
      path: '/user/profile',
      element: <Profile />
    },
    },
    {
      path: '/applicant',
      element: <AddNewApplicant />
    },
    {
      path: '/interview/:id',
      element: <Interview />
    }
  ]
};

export default MainRoutes;
