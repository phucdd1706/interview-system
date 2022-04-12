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
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
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
      breadcrumbs: false
    }
  ]
};

export default dashboard;
