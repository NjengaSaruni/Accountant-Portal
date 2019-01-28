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
import {StoreModule} from '@ngrx/store';
import {reducers} from '../auth/store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects, RegisterEffects} from '../auth/store/effects';
import { ModalComponent } from './components/modal/modal.component';
import {ModalService} from './components/modal/modal.service';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    MessageComponent,
    ModalComponent
  ],
  imports: [
    // External modules
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,

    // NgRx
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects, RegisterEffects]),
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    MessageComponent,
    ModalComponent
  ],
  providers: [
    LoaderService,
    MessageService,
    ModalService
  ]
})
export class SharedModule { }
