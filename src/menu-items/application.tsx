// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconStairsUp, IconUserCheck, IconHistory, IconFilePlus, IconWorld } from '@tabler/icons';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const icons = { IconStairsUp, IconUserCheck, IconHistory, IconFilePlus, CorporateFareIcon, IconWorld };

const application = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  role: 1,
  children: [
    {
      id: 'manage-member',
      title: <FormattedMessage id="manage-member" />,
      type: 'collapse',
      role: 1,
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'administrator',
          title: <FormattedMessage id="administrator" />,
          type: 'item',
          role: 1,
          url: '/user/administrator'
        },
        {
          id: 'customer',
          title: <FormattedMessage id="customer" />,
          type: 'item',
          role: 1,
          url: '/user/customer'
        }
      ]
    },
    {
      id: 'language',
      title: <FormattedMessage id="language" />,
      type: 'item',
      role: 1,
      url: '/language',
      icon: icons.IconWorld,
      breadcrumbs: true
    },
    {
      id: 'manage-department',
      title: <FormattedMessage id="department" />,
      type: 'item',
      role: 1,
      url: '/department',
      icon: icons.CorporateFareIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-rank',
      title: <FormattedMessage id="manage-rank" />,
      type: 'item',
      role: 1,
      url: '/ranks',
      icon: icons.IconStairsUp,
      breadcrumbs: true
    },

    {
      id: 'manage-question',
      title: <FormattedMessage id="manage-question" />,
      type: 'item',
      role: 1,
      url: '/questions',
      icon: icons.IconStairsUp,
      breadcrumbs: true
    },
    {
      id: 'applicant',
      title: <FormattedMessage id="add new applicant reference" />,
      type: 'item',
      role: 2,
      url: '/applicant',
      icon: icons.IconFilePlus,
      breadcrumbs: true
    },
    {
      id: 'history',
      title: <FormattedMessage id="history" />,
      type: 'item',
      role: 2,
      url: '/history',
      icon: icons.IconHistory,
      breadcrumbs: true
    }
  ]
};

const userRole = JSON.parse(localStorage.getItem('user') || '{}');
const hiddenRoute: Array<string> = [];
const getHiddenRoute = (route: any) => {
  if (route.children) {
    route.children.forEach((element: any) => getHiddenRoute(element));
  } else {
    if (route.role !== userRole.type) {
      hiddenRoute.push(route.url);
    }
    return hiddenRoute;
  }
  return hiddenRoute;
};

export const filterAuthorization = getHiddenRoute(application);

export default application;
