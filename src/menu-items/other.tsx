// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap
};

const other = {
  id: 'dashboard',
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
      id: 'qlrank',
      title: <FormattedMessage id="rank" />,
      type: 'item',
      url: '/views/pages/qlrank/index',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }
  ]
};

export default other;
