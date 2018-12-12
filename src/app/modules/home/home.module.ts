import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphsModule} from '../graphs/graphs.module';
import {HomeComponent} from './pages/home.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GraphsModule,
    AngularFontAwesomeModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
