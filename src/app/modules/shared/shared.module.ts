import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule} from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import {LoaderService} from './components/loader/loader.service';
import { MessageComponent } from './components/message/message.component';
import {MessageService} from './components/message/message.service';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    MessageComponent
  ],
  imports: [
    // External modules
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    MessageComponent
  ],
  providers: [
    LoaderService,
    MessageService
  ]
})
export class SharedModule { }
