import { UserRoleConstant } from '../constants/UserRolesConstant';

export class NavLinksModel {
  public label: string;
  public roles: UserRoleConstant[];
  public subItems: NavLinksModel[];
  public icon: string;

  constructor() {
    this.label = '';
    this.roles = [];
    this.subItems = [];
    this.icon = '';
  }
}
