import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  Card,
  DashboardCardsModel,
} from '../common/models/DashboardCardsModel';
import { DashboardCardsConstant } from '../common/constants/DashboardCardsConstant';
import { UserRoleConstant } from '../common/constants/UserRolesConstant';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public cards: Card[] | undefined;
  public cardsSet2: Card[] | undefined;
  columns: Boolean = true;
  public userData: any;

  observeResolution(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .pipe(
        map((result) => {
          if (result.breakpoints[Breakpoints.Large]) {
            return true; // Large screen: 4 columns
          } else {
            return false; // Small or Medium screen: 2 columns
          }
        })
      );
  }
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    this.observeResolution().subscribe((columns) => {
      this.columns = columns;
    });
  }
  ngOnInit() {
    this.authService.userData$.subscribe(userData => {
      this.userData = userData;
      console.log(userData)
    });
    let allCards = DashboardCardsConstant.find(
      (card) => card.role === UserRoleConstant.ADMIN
    )?.cards;
    this.cards = allCards?.setOne;
    this.cardsSet2 = allCards?.setTwo;
  }
}
