import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from '../charts/charts.module';
import {HomeComponent} from './pages/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
  declarations: [
    HomeComponent,
    IntroComponent,
    // DashboardComponent,
  ],
  imports: [
    // External
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    FlexLayoutModule,

    // Internal
    HomeRoutingModule,
    ChartsModule,
    SharedModule
  ],
})
export class HomeModule { }
