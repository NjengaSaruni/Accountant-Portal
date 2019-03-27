import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {filter, map} from 'rxjs/operators';

import * as loaderActions from '../actions/loader.actions';

@Injectable()
export class LoadingIndicatorEffects {
  constructor(private actions$: Actions) { }

  @Effect()
  showLoader$ = this.actions$.pipe(
    filter((action: any) => (action && action.showLoader ? action : null)),
    map((action: any) => {
      return new loaderActions.ShowLoader(action)
    })
  );

  @Effect()
  hideLoader$ = this.actions$.pipe(
    map(action => {
      return action;
    }),
    filter((action: any) => {
      return (action && action.triggerAction ? action : null)
    }),
    map((action: any) => new loaderActions.HideLoader(action))
  );
}
