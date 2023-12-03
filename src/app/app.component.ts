import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItemsContant } from './common/constants/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinksModel';
import { UserRoleConstant } from './common/constants/UserRolesConstant';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '250px', // Adjust this width as needed
        })
      ),
      state(
        'closed',
        style({
          width: '72px', // Adjust this width as needed
        })
      ),
      transition('open <=> closed', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class AppComponent implements OnInit {

  public title = 'teamedserv-app';
  public showSpinner=false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}


  ngOnInit(): void {
  }

  public handleLogOut() {
    this.authService.logout();
  }
  public checkIsValid(){
    let userProfile = this.authService.getUserData();
    return !!userProfile && Object.keys(userProfile).length !== 0; // Assuming userData exists if the user is logged in
  }
}
