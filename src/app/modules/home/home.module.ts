import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphsModule} from '../graphs/graphs.module';
import {HomeComponent} from './pages/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    GraphsModule,
    SharedModule,
    HomeRoutingModule,
    AngularFontAwesomeModule,
  ],
})
export class HomeModule { }
