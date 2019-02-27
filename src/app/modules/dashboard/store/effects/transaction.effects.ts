import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
// RXJS imports
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, startWith} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import * as transactionActions from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {
  constructor(private transactionsService: TransactionsService, private action$: Actions) {}

  @Effect()
  loadTransactions$:  Observable<Action> = this.action$.pipe(
      ofType<transactionActions.LoadTransactions>(transactionActions.TransactionActionTypes.TRANSACTION_LOAD),
      startWith(new transactionActions.LoadTransactions()),
      mergeMap(() =>
        this.transactionsService
          .getTransactions()
          .pipe(
            // If successful, dispatch success action with result
            map(data => new transactionActions.LoadTransactionsSuccess(data)),
            // If request fails, dispatch failed action
            catchError(() => of({ type: transactionActions.TransactionActionTypes.TRANSACTION_ADD_FAIL }))
          )
      )
  );

  @Effect()
  addTransaction$:  Observable<Action> = this.action$.pipe(
      ofType<transactionActions.AddTransaction>(transactionActions.TransactionActionTypes.TRANSACTION_ADD),
      mergeMap(action =>
        this.transactionsService
          .addTransaction(action.payload)
          .pipe(
            // If successful, dispatch success action with result
            map(data => ({ type: transactionActions.TransactionActionTypes.TRANSACTION_ADD_SUCCESS, payload: data })),
            // If request fails, dispatch failed action
            catchError(() => of({ type: transactionActions.TransactionActionTypes.TRANSACTION_ADD_FAIL }))
          )
      )
  );

  @Effect()
  deleteTransaction$:  Observable<Action> = this.action$.pipe(
    ofType<transactionActions.DeleteTransaction>(transactionActions.TransactionActionTypes.TRANSACTION_DELETE),
    mergeMap(action =>
      this.transactionsService
        .deleteTransaction(action.payload)
        .pipe(
          // If successful, dispatch success action with result
          map(() => {
            return ({ type: transactionActions.TransactionActionTypes.TRANSACTION_DELETE_SUCCESS, payload: action.payload })
          }),
          // If request fails, dispatch failed action
          catchError(() => of({ type: transactionActions.TransactionActionTypes.TRANSACTION_DELETE_FAIL }))
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
