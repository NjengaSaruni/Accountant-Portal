import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    // External modules
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
