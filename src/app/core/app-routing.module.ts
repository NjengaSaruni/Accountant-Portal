import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../modules/auth/services/auth.guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: '../modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: '../modules/home/home.module#HomeModule',
    data: { animation: 'home' }

  },
  {
    path: 'account',
    loadChildren: '../modules/auth/auth.module#AuthModule',
    data: { animation: 'auth' }
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {

    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
