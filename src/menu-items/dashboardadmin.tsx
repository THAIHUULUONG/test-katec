// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconClipboard, IconClipboardList, IconSchool, IconNfc, IconUsers, IconMilitaryRank } from '@tabler/icons';
import { OverrideIcon } from 'types';

// constant
const icons = {
    IconDashboard,
    IconClipboard,
    IconClipboardList,
    IconSchool,
    IconNfc,
    IconUsers,
    IconMilitaryRank
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
        {
            id: 'role-user',
            title: <FormattedMessage id="Quản lý chức vụ" />,
            type: 'item',
            url: '/role-user',
            icon: icons.IconMilitaryRank,
            breadcrumbs: false
        },
        {
            id: 'group-class',
            title: <FormattedMessage id="Quản lý nhóm lớp học" />,
            type: 'item',
            url: '/group-class',
            icon: icons.IconClipboardList,
            breadcrumbs: false
        },
        {
            id: 'class-room',
            title: <FormattedMessage id="Quản lý lớp học" />,
            type: 'item',
            url: '/class-room',
            icon: icons.IconClipboard,
            breadcrumbs: false
        },
        {
            id: 'manage-student',
            title: <FormattedMessage id="Quản lý học sinh" />,
            type: 'item',
            url: '/manage-student',
            icon: icons.IconSchool,
            breadcrumbs: false
        },
    ]
};

export default dashboardAdmin;
