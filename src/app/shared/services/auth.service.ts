import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuthModel } from 'src/app/common/models/UserAuthModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false; // Simulating user authentication status
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();

  constructor() {
    const userData = this.getUserData();
    if (userData) {
      this.userDataSubject.next(userData);
    }
  }

  // Simulated login
  login(userData: UserAuthModel): boolean {
    if (userData.email === 'admin' && userData.password === 'admin') {
      this.isLoggedIn = true;
      this.storeUserData({
        first_name: 'Deepak',
        last_name: 'Mane',
        id: 1,
        user_type: 1,
      });
      return true;
    }
    return false;
  }

  storeUserData(userData: any) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }

  getUserData(): any {
    return JSON.parse(sessionStorage.getItem('userData') || '{}');
  }

  // Simulated logout
  logout(): void {
    sessionStorage.clear();
    console.log(sessionStorage.getItem('userData'));
  }

  isAuthenticated(): boolean {
    const userData = this.getUserData();
    return !!userData && Object.keys(userData).length !== 0; // Assuming userData exists if the user is logged in
  }
}
