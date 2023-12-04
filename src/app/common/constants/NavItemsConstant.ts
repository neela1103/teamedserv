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
    url: '/',
  },
  {
    label: 'Team Board',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [],
    icon: 'group',
    url: '/',
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
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Medical Team',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
    ],
    icon: 'medication',
    url: '/',
  },
  {
    label: 'Customer/Company',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Customer/Company',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/customer',
        subItems: [],
      },
      {
        label: 'Add Customer/Company',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/customer/add',
        subItems: [],
      },
    ],
    icon: 'business',
    url: '/',
  },
  {
    label: 'Patient',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Patient',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Patient',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
    ],
    icon: 'hotel',
    url: '/',
  },
  {
    label: 'Assignment/Services',
    roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Assignment/Services',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Assignment/Services',
        roles: [UserRoleConstant.ADMIN, UserRoleConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
    ],
    icon: 'assignment',
    url: '/',
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
    url: '/',
  },
];
