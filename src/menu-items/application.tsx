// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { IconStairsUp, IconUserCheck } from '@tabler/icons';

const icons = { IconUserCheck, CorporateFareIcon, IconStairsUp };

const application = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  children: [
    {
      id: 'manage-member',
      title: <FormattedMessage id="manage-member" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'administrator',
          title: <FormattedMessage id="administrator" />,
          type: 'item',
          url: '/user/administrator'
        },
        {
          id: 'customer',
          title: <FormattedMessage id="customer" />,
          type: 'item',
          url: '/user/customer'
        }
      ]
    },
    {
      id: 'manage-department',
      title: <FormattedMessage id="Department" />,
      type: 'item',
      url: '/department',
      icon: icons.CorporateFareIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-rank',
      title: <FormattedMessage id="manage-rank" />,
      type: 'item',
      url: '/ranks',
      icon: icons.IconStairsUp,
      breadcrumbs: false
    }
  ]
};

export default application;
