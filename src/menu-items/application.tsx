// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconUserCheck } from '@tabler/icons';

const icons = { IconUserCheck };

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
        }
      ]
    },
    {
      id: 'history',
      title: <FormattedMessage id="history" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'complete',
          title: <FormattedMessage id="complete" />,
          type: 'item',
          url: '/complete'
        },
        {
          id: 'inprogress',
          title: <FormattedMessage id="inProgress" />,
          type: 'item',
          url: '/inprogress'
        }
      ]
    }
  ]
};

export default application;
