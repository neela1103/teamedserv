import { NavLinksModel } from '../models/NavLinksModel';
import { UserRoleConstant } from './UserRolesConstant';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Dashboard',
    roles: [
      UserRoleConstant.ADMIN,
      UserRoleConstant.CUSTOMER,
      UserRoleConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'home',
  },
  {
    label: 'Team Board',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [],
    icon: 'group',
  },
  {
    label: 'Medical Team',
    roles: [
      UserRoleConstant.ADMIN,
      UserRoleConstant.CUSTOMER,
      UserRoleConstant.PROFESSIONAL,
    ],
    subItems: [
      {
        label: 'View Medical Team',
        roles: [
          UserRoleConstant.ADMIN,
          UserRoleConstant.CUSTOMER,
          UserRoleConstant.PROFESSIONAL,
        ],
        icon: '',
        subItems: [],
      },
      {
        label: 'Add Medical Team',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
    ],
    icon: 'medication',
  },
  {
    label: 'Customer/Company',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Customer/Company',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
      {
        label: 'Add Customer/Company',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
    ],
    icon: 'business',
  },
  {
    label: 'Patient',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Patient',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
      {
        label: 'Add Patient',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
    ],
    icon: 'hotel',
  },
  {
    label: 'Assignment/Services',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Assignment/Services',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
      {
        label: 'Add Assignment/Services',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        subItems: [],
      },
    ],
    icon: 'assignment',
  },
  {
    label: 'Manage Activities',
    roles: [
      UserRoleConstant.ADMIN,
      UserRoleConstant.CUSTOMER,
      UserRoleConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'task alt',
  },
];
