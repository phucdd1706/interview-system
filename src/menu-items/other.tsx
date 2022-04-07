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
      id: 'applicant',
      title: <FormattedMessage id="add new applicant reference" />,
      type: 'item',
      url: '/add-new-applicant',
      icon: icons.IconFilePlus,
      breadcrumbs: false
    }
  ]
};

export default other;
