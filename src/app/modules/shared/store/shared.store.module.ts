import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import {LoadingIndicatorEffects} from './effects';

@NgModule({
  imports: [
    CommonModule,

    // Store
    StoreModule.forFeature('loader', reducers),
    EffectsModule.forFeature([LoadingIndicatorEffects]),
  ],
})
export class SharedStoreModule {}
