// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';
import { GrUserAdmin } from 'react-icons/gr';
import { FcDepartment } from 'react-icons/fc';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  GrUserAdmin,
  FcDepartment,
  CorporateFareIcon
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
      title: <FormattedMessage id="Admin" />,
      type: 'item',
      url: '/ds-admin',
      icon: icons.GrUserAdmin,
      breadcrumbs: false
    },
    {
      id: 'question',
      title: <FormattedMessage id="Department" />,
      type: 'item',
      url: '/ds-department',
      icon: icons.CorporateFareIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
