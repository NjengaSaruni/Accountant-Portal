import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from '../charts/charts.module';
import { CardComponent } from './components/card/card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    DashboardComponent, CardComponent],
  imports: [
    // External
    CommonModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,

    // Internal
    DashboardRoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class DashboardModule { }
