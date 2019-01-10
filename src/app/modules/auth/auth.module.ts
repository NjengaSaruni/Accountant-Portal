import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './pages/register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {reducers} from './store/reducers';


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

    // NgRx
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),


    // Internal modules
    SharedModule,


    // routing
    AuthRoutingModule,
  ]
})
export class AuthModule { }
