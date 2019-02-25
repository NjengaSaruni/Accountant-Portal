import { Action } from '@ngrx/store';

export const SHOW_LOADER = '[UI] Show loading spinner';
export const HIDE_LOADER = '[UI] Hide loading spinner';

export class ShowLoader implements Action {
  readonly type = SHOW_LOADER;

  constructor(public payload: any) {}
}

export class HideLoader implements Action {
  readonly type = HIDE_LOADER;

  constructor(public payload: any) {}
}

export type LoaderAction = ShowLoader | HideLoader;
