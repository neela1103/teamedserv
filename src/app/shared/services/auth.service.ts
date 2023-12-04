import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavItemsContant } from 'src/app/common/constants/NavItemsConstant';
import { UserRoleConstant } from 'src/app/common/constants/UserRolesConstant';
import { NavItemNode } from 'src/app/common/models/NavItemNodeModel';
import { NavLinksModel } from 'src/app/common/models/NavLinksModel';
import { UserAuthModel } from 'src/app/common/models/UserAuthModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _transformer = (node: NavLinksModel, level: number) => {
    return {
      expandable: !!node.subItems && node.subItems.length > 0,
      label: node.label,
      level: level,
      icon: node.icon,
      url: node.url,
    };
  };
  navItems: NavLinksModel[] = NavItemsContant;
  userRole: UserRoleConstant = UserRoleConstant.ADMIN;

  treeControl = new FlatTreeControl<NavItemNode>(
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
  currentlyExpandedNode: NavItemNode | null = null;

  hasChild = (_: number, node: NavItemNode) => node.expandable;

  public isLoggedIn: boolean = false; // Simulating user authentication status
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();
  public userProfile: any;
  private baseUrl = 'https://app.teamedserv.com/api';
  constructor(private router: Router, private http: HttpClient) {
    const userData = this.getUserData();
    if (userData) {
      this.userDataSubject.next(userData);
    }
  }

  toggleNode(node: NavItemNode): void {
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

  login(userData: UserAuthModel): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`; // Your login endpoint
    let fd = new FormData();
    fd.append('username', userData.email);
    fd.append('password', userData.password);

    return this.http.post<any>(loginUrl, fd);
  }

  storeUserData(userData: any) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }

  getUserData(): any {
    return JSON.parse(sessionStorage.getItem('userData') || '{}');
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.clear();
    console.log(sessionStorage.getItem('userData'));
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    this.userProfile = this.getUserData();
    this.dataSource.data = NavItemsContant.filter((navItems) =>
      navItems.roles.includes(this.userProfile.user_type)
    );
    if (this.userProfile) this.isLoggedIn = true;
    else this.isLoggedIn = false;
    return !!this.userProfile && Object.keys(this.userProfile).length !== 0; // Assuming userData exists if the user is logged in
  }
}
