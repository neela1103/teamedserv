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

interface ExampleFlatNode {
  expandable: boolean;
  label: string;
  level: number;
  icon: string;
}
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
  private _transformer = (node: NavLinksModel, level: number) => {
    return {
      expandable: !!node.subItems && node.subItems.length > 0,
      label: node.label,
      level: level,
      icon: node.icon,
    };
  };

  title = 'teamedserv-app';
  navItems: NavLinksModel[] = NavItemsContant;
  userRole: UserRoleConstant = UserRoleConstant.ADMIN;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.subItems
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  currentlyExpandedNode: ExampleFlatNode | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.authService.storeUserData(userData);
    }
    this.dataSource.data = NavItemsContant.filter((navItems) =>
      navItems.roles.includes(UserRoleConstant.ADMIN)
    );
  }

  toggleNode(node: ExampleFlatNode): void {
    if (
      this.currentlyExpandedNode &&
      this.treeControl.isExpanded(this.currentlyExpandedNode)
    ) {
      this.treeControl.collapse(this.currentlyExpandedNode);
      if (this.currentlyExpandedNode.label === node.label) {
        this.currentlyExpandedNode = null;
        return;
      }
    }
    // if(!this.currentlyExpandedNode) {
    this.treeControl.toggle(node);
    this.currentlyExpandedNode = this.treeControl.isExpanded(node)
      ? node
      : null;
    // }
    // else if( this.currentlyExpandedNode.label !== node.label ){
    //   this.treeControl.toggle(node);
    //   this.currentlyExpandedNode = this.treeControl.isExpanded(node) ? node : null;
    // }
  }

  public getNavItems() {
    return this.navItems.filter((item) => item.roles.includes(this.userRole));
  }
  public handleLogOut() {
    this.authService.logout();
  }
}
