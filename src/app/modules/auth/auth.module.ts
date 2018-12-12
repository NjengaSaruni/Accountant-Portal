import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    AngularFontAwesomeModule
  ]
})
export class AuthModule { }
