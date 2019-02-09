import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: '../modules/dashboard/dashboard.module#DashboardModule',
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
