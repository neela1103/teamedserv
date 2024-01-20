import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard/auth.guard';
import { LoginGuard } from './shared/loginguard/login.guard';
import { TeamBoardComponent } from './team-board/team-board.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-team',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'team-board',
    component: TeamBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
