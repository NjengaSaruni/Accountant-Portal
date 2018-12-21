import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './pages/register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../common/store/reducers';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forFeature('reports', reducers),

    // Internal modules
    SharedModule,

    // routing
    AuthRoutingModule,
  ]
})
export class AuthModule { }
