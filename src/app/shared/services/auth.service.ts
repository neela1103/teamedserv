import { Injectable } from '@angular/core';
import { UserAuthModel } from 'src/app/common/models/UserAuthModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = true; // Simulating user authentication status

  constructor() {}

  // Simulated login
  login(userData: UserAuthModel): boolean {
    // Perform authentication logic, e.g., check credentials against a database
    // For demonstration purposes, using dummy credentials
    console.log(userData);
    if (userData.email === 'admin' && userData.password === 'admin') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  // Simulated logout
  logout(): void {
    // Clear user authentication status
    this.isLoggedIn = false;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
