import { UserRoleConstant } from '../constants/UserRolesConstant';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  icon: string;
}

export class DashboardCardsModel {
  public role: UserRoleConstant | undefined;
  public cards: {
    setOne: Card[];
    setTwo: Card[];
  };

  constructor() {
    this.cards = {
      setOne: [],
      setTwo: [],
    };
  }
}
