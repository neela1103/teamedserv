import { NavLinksModel } from '../models/NavLinksModel';
import { UserTypeConstant } from './UserTypeConstant';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Dashboard',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'home',
    url: '/',
  },
  {
    label: 'Team Board',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [],
    icon: 'group',
    url: '/team-board',
  },
  {
    label: 'Medical Team',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [
      {
        label: 'All Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.PROFESSIONAL,
        ],
        icon: '',
        url: 'medical-team',
        subItems: [],
      },
      {
        label: 'Add Medical Team',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
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
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Customer/Company',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
        icon: '',
        url: '/customer',
        subItems: [],
      },
      {
        label: 'Add Customer/Company',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
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
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Patient',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Patient',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
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
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [
      {
        label: 'All Assignment/Services',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
        icon: '',
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Assignment/Services',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
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
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'task alt',
    url: '/',
  },
];
