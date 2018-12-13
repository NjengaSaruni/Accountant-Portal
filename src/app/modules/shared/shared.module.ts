import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule} from '@angular/router';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent
  ],
  imports: [
    // External modules
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
