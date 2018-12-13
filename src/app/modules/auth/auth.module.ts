import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './pages/register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { RegisterFormComponent } from './forms/register-form/register-form.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,

    // Internal modules
    SharedModule,

    // routing
    AuthRoutingModule,
  ]
})
export class AuthModule { }
