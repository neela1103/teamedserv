import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItemsContant } from './common/constants/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinksModel';
import { UserRoleConstant } from './common/constants/UserRolesConstant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'teamedserv-app';
  navItems: NavLinksModel[] = NavItemsContant;
  userRole: UserRoleConstant = UserRoleConstant.ADMIN;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  public getNavItems() {
    return this.navItems.filter((item) => item.roles.includes(this.userRole));
  }
}
