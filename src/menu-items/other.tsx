// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconBrandChrome, IconHelp, IconSitemap, IconClipboardCheck, IconClipboard, IconHistory, IconFilePlus } from '@tabler/icons';

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  IconClipboardCheck,
  IconClipboard,
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
      id: 'complete',
      title: <FormattedMessage id="complete" />,
      type: 'item',
      url: '/complete',
      icon: icons.IconClipboardCheck,
      breadcrumbs: false
    },
    {
      id: 'inprogress',
      title: <FormattedMessage id="inProgress" />,
      type: 'item',
      url: '/inprogress',
      icon: icons.IconClipboard
    },
    {
      id: 'applicant',
      title: <FormattedMessage id="add new applicant reference" />,
      type: 'item',
      url: '/applicant',
      icon: icons.IconFilePlus,
      breadcrumbs: false
    }
  ]
};

export default other;
