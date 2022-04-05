// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconBrandChrome, IconHelp, IconSitemap, IconHistory, IconFilePlus } from '@tabler/icons';

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  IconHistory,
  IconFilePlus
};

const other = {
  id: 'home',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'employee',
      title: <FormattedMessage id="add new employee info" />,
      type: 'item',
      url: '/employee',
      icon: icons.IconFilePlus,
      breadcrumbs: false
    }
  ]
};

export default other;
