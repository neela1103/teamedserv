import { NavLinksModel } from '../models/NavLinksModel';
import { UserTypeConstant } from './UserTypeConstant';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Dashboard',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'home',
    url: '/',
  },
  {
    label: 'Team Board',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    subItems: [],
    icon: 'group',
    url: '/team-board',
  },
  {
    label: 'Ambulance',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [],
    icon: 'local_car_wash',
    url: '/team-board',
  },
  {
    label: 'Living ##',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [],
    icon: 'home',
    url: '/team-board',
  },
  {
    label: 'Job-Portal ##',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    subItems: [],
    icon: 'work',
    url: '/team-board',
  },
  {
    label: 'Medical Team',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [
      {
        label: 'All Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
          UserTypeConstant.PROFESSIONAL,
        ],
        icon: '',
        url: 'medical-team',
        subItems: [],
      },
      {
        label: 'Add Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/medical-team/add',
        subItems: [],
      },
    ],
    icon: 'medication',
    url: '/',
  },
  {
    label: 'Customer/Company',
    roles: [UserTypeConstant.ADMIN],
    subItems: [
      {
        label: 'All Customer/Company',
        roles: [UserTypeConstant.ADMIN],
        icon: '',
        url: '/customer',
        subItems: [],
      },
      {
        label: 'Add Customer/Company',
        roles: [UserTypeConstant.ADMIN],
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
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    subItems: [
      {
        label: 'All Patient',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/patients',
        subItems: [],
      },
      {
        label: 'Add Patient #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/patients/add',
        subItems: [],
      },
    ],
    icon: 'hotel',
    url: '/',
  },
  {
    label: 'Assignment/Services #',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    subItems: [
      {
        label: 'All Assignment/Services #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/',
        subItems: [],
      },
      {
        label: 'Add Assignment/Services #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/',
        subItems: [],
      },
    ],
    icon: 'assignment',
    url: '/',
  },
  {
    label: 'Manage Activities #',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    subItems: [],
    icon: 'task alt',
    url: '/',
  },
];
