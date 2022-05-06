// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconStairsUp, IconUserCheck, IconHistory, IconFilePlus, IconWorld } from '@tabler/icons';
import QuizIcon from '@mui/icons-material/Quiz';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const icons = { IconStairsUp, IconUserCheck, IconHistory, IconFilePlus, CorporateFareIcon, IconWorld, QuizIcon };

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
      id: 'department',
      title: <FormattedMessage id="department" />,
      type: 'item',
      role: 1,
      url: '/department',
      icon: icons.CorporateFareIcon,
      breadcrumbs: true
    },
    {
      id: 'ranks',
      title: <FormattedMessage id="manage-rank" />,
      type: 'item',
      role: 1,
      url: '/ranks',
      icon: icons.IconStairsUp,
      breadcrumbs: true
    },

    {
      id: 'questions',
      title: <FormattedMessage id="manage-question" />,
      type: 'item',
      role: 1,
      url: '/questions',
      icon: icons.QuizIcon,
      breadcrumbs: true
    },
    {
      id: 'applicant',
      title: <FormattedMessage id="add-new-applicant" />,
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

export default application;
