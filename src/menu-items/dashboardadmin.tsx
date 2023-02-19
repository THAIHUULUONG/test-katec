// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconBasket, IconLayoutKanban, IconNfc, IconUsers } from '@tabler/icons';
import { OverrideIcon } from 'types';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconBasket,
    IconLayoutKanban,
    IconNfc,
    IconUsers
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

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

const dashboardAdmin: DashboardMenuProps = {
    id: 'dashboard-admin',
    title: '',
    type: 'group',
    children: [
        {
            id: 'manage-user',
            title: <FormattedMessage id="Quản lý người dùng" />,
            type: 'item',
            url: '/manage-user',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
    ]
};

export default dashboardAdmin;
