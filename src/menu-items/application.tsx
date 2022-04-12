// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconUserCheck } from '@tabler/icons';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const icons = { IconUserCheck, CorporateFareIcon };

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
    }
  ]
};

export default application;
