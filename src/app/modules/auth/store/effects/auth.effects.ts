import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import {SettingsService} from '../../../shared/services/settings.service';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  // Listen for the 'LOGIN' action
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(authActions.AuthActionTypes.LOGIN),
    mergeMap(action =>
      this.authService.login(action.payload.email, action.payload.password).pipe(
        map(data => {
          localStorage.setItem('token', data.key);
          return data.key;
        }),

        // If successful, dispatch success action with token for further requests
        map(data => new authActions.LoginSuccess(data)),

        // If request fails, dispatch failed action
        catchError(() => of({ type: authActions.AuthActionTypes.LOGIN_FAILURE }))
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(authActions.AuthActionTypes.LOGOUT),
    map( action => new authActions.LogoutConfirmed())
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private settings: SettingsService,
              private authService: AuthService
  ) {}
}
