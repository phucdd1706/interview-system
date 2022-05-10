// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// PROJECT IMPORTS
import { OverrideIcon } from 'types';

const icons = { IconDashboard, IconDeviceAnalytics };

interface DashboardMenuProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  role?: number;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    role?: number;
    url: string;
    icon: OverrideIcon;
    breadcrumbs: boolean;
  }[];
}

const dashboard: DashboardMenuProps = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
