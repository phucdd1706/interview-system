// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const AddApplicantReference = Loadable(lazy(() => import('views/add-new-applicant-reference')));
const InterviewScreen = Loadable(lazy(() => import('views/interview')));
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
      path: '/add-new-applicant',
      element: <AddApplicantReference />
    },
    {
      path: '/interview/:id',
      element: <InterviewScreen />
    }
  ]
};

export default MainRoutes;
