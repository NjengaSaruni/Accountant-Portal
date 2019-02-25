import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {AuthStoreModule} from '../../modules/auth/store/auth.store.module';
import {DashboardStoreModule} from '../../modules/dashboard/store/dashboard.store.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import * as authActions from '../../modules/auth/store/actions/auth.actions'

export function clearState(reducer) {
  return function (state, action) {

    if (action.type === authActions.AuthActionTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

@NgModule({
  imports: [
    CommonModule,
    AuthStoreModule,
    DashboardStoreModule,
    StoreModule.forRoot({},  { metaReducers: [clearState] }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: []
})
export class CoreStoreModule {}
