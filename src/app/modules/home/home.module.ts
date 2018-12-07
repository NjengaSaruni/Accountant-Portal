import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphsModule} from '../graphs/graphs.module';
import {HomeComponent} from './pages/home.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GraphsModule,
    AngularFontAwesomeModule
  ],
})
export class HomeModule { }
