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
      id: 'analytics',
      title: <FormattedMessage id="analytics" />,
      type: 'item',
      url: '/dashboard/analytics',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
