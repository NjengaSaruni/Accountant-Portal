import { Action } from '@ngrx/store';
import {HideLoader, ShowLoader} from '../../../shared/decorators';
import {ILimit} from '../../models/Limit.model';

/*
  LIMIT ACTIONS
*/

export enum LimitActionTypes {
  LIMIT_LOAD = '[Dashboard Page] Limit Load',
  LIMIT_LOAD_FAIL = '[Dashboard Page] Limit Fail',
  LIMIT_LOAD_SUCCESS = '[Dashboard Page] Limit Success',
  LIMIT_ADD = '[Dashboard Page] Add Limit Item',
  LIMIT_ADD_FAIL = '[Dashboard Page] Add Limit Item Fail',
  LIMIT_ADD_SUCCESS = '[Dashboard Page] Add Limit Item Success',
  LIMIT_UPDATE = '[Dashboard Page] Update Limit Item',
  LIMIT_UPDATE_FAIL = '[Dashboard Page] Update Limit Item Fail',
  LIMIT_UPDATE_SUCCESS = '[Dashboard Page] Update Limit Item Success',
  LIMIT_DELETE = '[Dashboard Page] Delete Limit Item',
  LIMIT_DELETE_FAIL = '[Dashboard Page] Delete Limit Item Fail',
  LIMIT_DELETE_SUCCESS = '[Dashboard Page] Delete Limit Item Success'
}

@ShowLoader()
export class LoadLimits implements Action {
  readonly type = LimitActionTypes.LIMIT_LOAD;
}

@HideLoader(LimitActionTypes.LIMIT_LOAD)
export class LoadLimitsFail implements Action {
  readonly type = LimitActionTypes.LIMIT_LOAD_FAIL;
  constructor(public payload: any) {}
}

@HideLoader(LimitActionTypes.LIMIT_LOAD)
export class LoadLimitsSuccess implements Action {
  readonly type = LimitActionTypes.LIMIT_LOAD_SUCCESS;
  constructor(public payload: ILimit[]) {}
}

@ShowLoader()
export class AddLimit implements Action {
  readonly type = LimitActionTypes.LIMIT_ADD;
  constructor(public payload: ILimit) {}
}

@HideLoader( LimitActionTypes.LIMIT_ADD)
export class AddLimitFail implements Action {
  readonly type = LimitActionTypes.LIMIT_ADD_FAIL;
}

@HideLoader( LimitActionTypes.LIMIT_ADD)
export class AddLimitSuccess implements Action {
  readonly type = LimitActionTypes.LIMIT_ADD_SUCCESS;
  constructor(public payload: ILimit) {}
}

@ShowLoader()
export class UpdateLimit implements Action {
  readonly type = LimitActionTypes.LIMIT_UPDATE;
  constructor(public payload: any) {}
}

@HideLoader( LimitActionTypes.LIMIT_UPDATE)
export class UpdateLimitFail implements Action {
  readonly type = LimitActionTypes.LIMIT_UPDATE_FAIL;
}

@HideLoader(LimitActionTypes.LIMIT_UPDATE)
export class UpdateLimitSuccess implements Action {
  readonly type = LimitActionTypes.LIMIT_UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

@ShowLoader()
export class DeleteLimit implements Action {
  readonly type = LimitActionTypes.LIMIT_DELETE;
  constructor(public payload: any) {}
}

@HideLoader(LimitActionTypes.LIMIT_DELETE)
export class DeleteLimitFail implements Action {
  readonly type = LimitActionTypes.LIMIT_DELETE_FAIL;
}

@HideLoader(LimitActionTypes.LIMIT_DELETE)
export class DeleteLimitSuccess implements Action {
  readonly type = LimitActionTypes.LIMIT_DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export type LimitActions =
  | LoadLimits
  | LoadLimitsFail
  | LoadLimitsSuccess
  | AddLimit
  | AddLimitFail
  | AddLimitSuccess
  | UpdateLimit
  | UpdateLimitFail
  | UpdateLimitSuccess
  | DeleteLimit
  | DeleteLimitFail
  | DeleteLimitSuccess;
