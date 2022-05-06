// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const History = Loadable(lazy(() => import('views/pages/history/index')));
const Language = Loadable(lazy(() => import('views/pages/language/index')));
const Administrator = Loadable(lazy(() => import('views/pages/administrator')));
const Customer = Loadable(lazy(() => import('views/pages/customer')));
const Department = Loadable(lazy(() => import('views/pages/department')));
const Profile = Loadable(lazy(() => import('views/pages/account')));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar = Loadable(lazy(() => import('views/pages/account/tabs/Calendar/Calendar')));
const Ranks = Loadable(lazy(() => import('views/pages/ranks')));
const Question = Loadable(lazy(() => import('views/pages/questions')));
const AddNewApplicant = Loadable(lazy(() => import('views/pages/add-new-applicant-reference')));

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
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/history',
      role: 2,
      element: <History />
    },
    {
      path: '/language',
      role: 1,
      element: <Language />
    },
    {
      path: '/user/administrator',
      role: 1,
      element: <Administrator />
    },
    {
      path: '/user/customer',
      role: 1,
      element: <Customer />
    },
    {
      path: '/department',
      role: 1,
      element: <Department />
    },
    {
      path: 'ranks',
      role: 1,
      element: <Ranks />
    },
    {
      path: '/questions',
      role: 1,
      element: <Question />
    },
    {
      path: '/user/profile',
      element: <Profile />
    },
    {
      path: '/applicant',
      role: 2,
      exact: true,
      element: <AddNewApplicant />,
      children: [
        {
          path: '/applicant/:id',
          role: 2,
          element: <AddNewApplicant />
        }
      ]
    }
  ]
};

const user = JSON.parse(localStorage.getItem('user') || '{}');

MainRoutes.children = MainRoutes.children.filter((child) => {
  if (child.role) {
    return user.type === child.role;
  }
  return true;
});

export default MainRoutes;
