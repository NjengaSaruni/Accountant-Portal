import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AuthEffects, RegisterEffects} from './effects';
import {reducers} from './reducers';

@NgModule({
  imports: [
    CommonModule,
    // NgRx
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects, RegisterEffects]),
  ],
  providers: [
    AuthEffects,
    RegisterEffects
  ]
})
export class AuthStoreModule {}
