import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: '../modules/home/home.module#HomeModule'
  },
  {
    path: 'auth',
    loadChildren: '../modules/auth/auth.module#AuthModule'
  },
  {
    path: '',
    pathMatch: 'prefix', //default
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
