import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from '../charts/charts.module';
import {HomeComponent} from './pages/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    HomeRoutingModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
})
export class HomeModule { }
