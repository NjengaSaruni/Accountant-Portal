import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as registerActions from '../actions/register.actions';
import * as authActions from '../actions/auth.actions';
import {SettingsService} from '../../../shared/services/settings.service';

@Injectable()
export class RegisterEffects {
  // Listen for the 'REGISTER' action
  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<registerActions.Register>(registerActions.RegisterActionTypes.REGISTER),
    mergeMap(action =>
      this.http.post(this.registerApi, action.payload).pipe(
        // If successful, dispatch success action with result
        switchMap(data => [
          {
            type: registerActions.RegisterActionTypes.REGISTER_SUCCESS,
            payload: data
          }, {
            type: authActions.AuthActionTypes.LOGIN_SUCCESS,
            payload: data
          }
        ]),
        // If request fails, dispatch failed action
        catchError(() => of({ type: registerActions.RegisterActionTypes.REGISTER_FAILURE }))
      )
    )
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private settings: SettingsService
  ) {}

  get registerApi(): string {
    return this.settings.apiHost + 'rest-auth/registration/';
  }

}
