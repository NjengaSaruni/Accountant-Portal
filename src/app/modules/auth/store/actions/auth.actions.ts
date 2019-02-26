import { Action } from '@ngrx/store';
import {IAuthenticationPayload, IUser} from '../../models/user';
import {HideLoader, ShowLoader} from '../../../shared/decorators';

export enum AuthActionTypes {
  LOGIN = '[Login Page] Login',
  LOGIN_COMPLETE = '[Login Page] Login Complete',
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
  CHECK_LOGIN = '[Auth] Check Login',
  LOGOUT = '[Auth] Logout',
  LOGOUT_CANCELLED = '[Auth] Logout Cancelled',
  LOGOUT_CONFIRMED = '[Auth] Logout Confirmed'
}

@ShowLoader()
export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  readonly payload: any;
  constructor(payload: IAuthenticationPayload) {
    this.payload = payload;
  }
}

@HideLoader(AuthActionTypes.LOGIN)
export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
}

@HideLoader(AuthActionTypes.LOGIN)
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  readonly payload: any;

  constructor(token: string) {
    this.payload = token;
  }
}

@HideLoader(AuthActionTypes.LOGIN_FAILURE)
export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class CheckLogin implements Action {
  readonly type = AuthActionTypes.CHECK_LOGIN;
}

@ShowLoader()
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

@HideLoader(AuthActionTypes.LOGOUT)
export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LOGOUT_CONFIRMED;
}

@HideLoader(AuthActionTypes.LOGOUT)
export class LogoutCancelled implements Action {
  readonly type = AuthActionTypes.LOGOUT_CANCELLED;
}

export type AuthActions =
  | Login
  | LoginComplete
  | LoginSuccess
  | LoginFailure
  | CheckLogin
  | Logout
  | LogoutCancelled
  | LogoutConfirmed;
