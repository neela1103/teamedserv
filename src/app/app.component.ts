import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItemsContant } from './common/constants/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinksModel';
import { UserRoleConstant } from './common/constants/UserRolesConstant';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  label: string;
  level: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _transformer = (node: NavLinksModel, level: number) => {
    return {
      expandable: !!node.subItems && node.subItems.length > 0,
      label: node.label,
      level: level,
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

  constructor(private breakpointObserver: BreakpointObserver) {}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.dataSource.data = NavItemsContant.filter((navItems) =>
      navItems.roles.includes(UserRoleConstant.ADMIN)
    );
  }

  public getNavItems() {
    return this.navItems.filter((item) => item.roles.includes(this.userRole));
  }
}
