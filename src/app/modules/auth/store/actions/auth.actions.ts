import { Action } from '@ngrx/store';
import {IAuthenticationPayload, IUser} from '../../models/user';

export enum AuthActionTypes {
  LOGIN = '[Login Page] Login',
  LOGIN_COMPLETE = '[Login Page] Login Complete',
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
  CHECK_LOGIN = '[Auth] Check Login',
  LOGOUT = '[Auth] Confirm Logout',
  LOGOUT_CANCELLED = '[Auth] Logout Cancelled',
  LOGOUT_CONFIRMED = '[Auth] Logout Confirmed'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  readonly payload: any;
  constructor(payload: IAuthenticationPayload) {
    this.payload = payload;
  }
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  readonly payload: any;

  constructor(user: IUser) {
    this.payload = user;
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class CheckLogin implements Action {
  readonly type = AuthActionTypes.CHECK_LOGIN;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LOGOUT_CONFIRMED;
}

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
