import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LimitsService} from '../../services/limits.service';
// RXJS imports
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, startWith} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import * as limitActions from '../actions/limit.actions';

@Injectable()
export class LimitEffects {
  constructor(private limitsService: LimitsService,
              private action$: Actions) {}

  @Effect()
  loadLimits$:  Observable<Action> = this.action$.pipe(
    ofType<limitActions.LoadLimits>(limitActions.LimitActionTypes.LIMIT_LOAD),
    startWith(new limitActions.LoadLimits()),
    mergeMap(() =>
      this.limitsService
        .getLimits()
        .pipe(
          // If successful, dispatch success action with result
          map(data => new limitActions.LoadLimitsSuccess(data)),
          // If request fails, dispatch failed action
          catchError(() => of({ type: limitActions.LimitActionTypes.LIMIT_ADD_FAIL }))
        )
    )
  );

  @Effect()
  addLimit$:  Observable<Action> = this.action$.pipe(
    ofType<limitActions.AddLimit>(limitActions.LimitActionTypes.LIMIT_ADD),
    mergeMap(action =>
      this.limitsService
        .addLimit(action.payload)
        .pipe(
          // If successful, dispatch success action with result
          map(data => new limitActions.AddLimitSuccess(data)),
          // If request fails, dispatch failed action
          catchError(() => of({ type: limitActions.LimitActionTypes.LIMIT_ADD_FAIL }))
        )
    )
  );

  @Effect()
  deleteLimit$:  Observable<Action> = this.action$.pipe(
    ofType<limitActions.DeleteLimit>(limitActions.LimitActionTypes.LIMIT_DELETE),
    mergeMap(action =>
      this.limitsService
        .deleteLimit(action.payload)
        .pipe(
          // If successful, dispatch success action with result
          map(data => new limitActions.DeleteLimitSuccess(action.payload)),
          // If request fails, dispatch failed action
          catchError(() => of({ type: limitActions.LimitActionTypes.LIMIT_DELETE_FAIL }))
        )
    )
  );

  // TODO handle updates
  // @Effect()
  // updateTask$ = this.action$.ofType(fromTodo.TODO_UPDATE).pipe(
  //   map((action: fromTodo.updateTodo) => action.payload),
  //   switchMap(task => {
  //     return this._todoService.updateTasks(task).pipe(
  //       map(response => {
  //         const { result } = response;
  //         return new fromTodo.updateTodoSuccess(result);
  //       }),
  //       catchError(err => of(new fromTodo.updateTodoFail()))
  //     );
  //   })
  // );
  //
}
