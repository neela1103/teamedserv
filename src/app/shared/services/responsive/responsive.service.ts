import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor(private breakpointObserver: BreakpointObserver) {}

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
}
