// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { filterAuthorization } from 'menu-items/application';
import PageNotFound from 'views/pages/404';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Complete = Loadable(lazy(() => import('views/pages/complete/index')));
const Inprogress = Loadable(lazy(() => import('views/pages/inProgress/index')));
const Language = Loadable(lazy(() => import('views/pages/language/index')));
const Administrator = Loadable(lazy(() => import('views/pages/administrator')));
const Customer = Loadable(lazy(() => import('views/pages/customer')));
const Department = Loadable(lazy(() => import('views/pages/department')));
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
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/complete',
      role: 2,
      element: <Complete />
    },
    {
      path: '/inprogress',
      role: 2,
      element: <Inprogress />
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
      path: '/user/profile',
      element: <Profile />
    },
    {
      path: '/applicant',
      role: 2,
      element: <AddNewApplicant />
    },
    {
      path: '/interview/:applicantId',
      role: 2,
      element: <Interview />
    }
  ]
};

const user = JSON.parse(localStorage.getItem('user') || '{}');

// filterAuthorization.forEach((item: string) => {
//   MainRoutes.children = MainRoutes.children.filter((child) => child.path !== item);
// });

MainRoutes.children = MainRoutes.children.filter((child) => {
  if (child.role) {
    return user.type === child.role;
  }
  return true;
});

export default MainRoutes;
