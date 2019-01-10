import {Action} from '@ngrx/store';
import {IRegistrationPayload} from '../../models/user';

export enum RegisterActionTypes {
  REGISTER = '[Register Page] Register',
  REGISTER_COMPLETE = '[Register Page] Register Complete',
  REGISTER_SUCCESS = '[Auth API] Register Success',
  REGISTER_FAILURE = '[Auth API] Register Failure'
}

export class Register implements Action {
  readonly type = RegisterActionTypes.REGISTER;
  readonly payload: any;
  constructor(payload: IRegistrationPayload) {
    this.payload = payload;
  }
}

export class RegisterComplete implements Action {
  readonly type = RegisterActionTypes.REGISTER_COMPLETE;
}

export class RegisterSuccess implements Action {
  readonly type = RegisterActionTypes.REGISTER_SUCCESS;
  readonly payload: any;

  constructor(token: string) {
    this.payload = token;
  }
}

export class RegisterFailure implements Action {
  readonly type = RegisterActionTypes.REGISTER_FAILURE;

  constructor(public payload: any) {}
}

export type RegisterActions =
  | Register
  | RegisterComplete
  | RegisterSuccess
  | RegisterFailure;
