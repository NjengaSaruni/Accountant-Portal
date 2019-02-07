import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {dashboardEffects} from './effects';
import {reducers} from './reducers';

@NgModule({
  imports: [
    CommonModule,

    // Store
    StoreModule.forFeature('transactions', reducers),
    EffectsModule.forFeature(dashboardEffects),
  ],
  providers: dashboardEffects
})
export class DashboardStoreModule {}
