import { DashboardCardsModel } from '../models/DashboardCardsModel';
import { UserRoleConstant } from './UserRolesConstant';

export const DashboardCardsConstant: DashboardCardsModel[] = [
  {
    role: UserRoleConstant.ADMIN,
    cards: {
      setOne: [
        {
          title: 'Employees',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-chart-areaspline widget-two-icon',
        },
        {
          title: 'Customers',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-layers widget-two-icon',
        },
        {
          title: 'Medical Teams',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-access-point-network widget-two-icon',
        },
        {
          title: 'Patients',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-account-convert widget-two-icon',
        },
      ],
      setTwo: [
        {
          title: 'Employees',
          cols: 1,
          rows: 1,
          icon: '',
        },
        {
          title: 'Customers',
          cols: 1,
          rows: 1,
          icon: '',
        },
      ],
    },
  },
];
