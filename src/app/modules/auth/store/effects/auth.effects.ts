import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import {SettingsService} from '../../../shared/services/settings.service';

@Injectable()
export class AuthEffects {
  // Listen for the 'LOGIN' action
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(authActions.AuthActionTypes.LOGIN),
    mergeMap(action =>
      this.http.post(this.loginApi, action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: authActions.AuthActionTypes.LOGIN_SUCCESS, payload: data })),
        // If request fails, dispatch failed action
        catchError(() => of({ type: authActions.AuthActionTypes.LOGIN_FAILURE }))
      )
    )
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private settings: SettingsService
  ) {}

  get loginApi(): string {
    return this.settings.apiHost + 'rest-auth/login/';
  }

}
