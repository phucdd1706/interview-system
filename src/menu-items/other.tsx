// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';
import { GrUserAdmin } from 'react-icons/gr';

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  GrUserAdmin
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
      id: 'admin',
      title: <FormattedMessage id="admin" />,
      type: 'item',
      url: '/ds-admin',
      icon: icons.GrUserAdmin,
      breadcrumbs: false
    }
  ]
};

export default other;
