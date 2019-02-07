import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';
import {ITransaction} from '../models/Transaction.model';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

const getTransactions = (state: State): any => state.transactions;

export const selectTransactionsState: MemoizedSelector<
  object,
  State
  > = createFeatureSelector<State>('transactions');

export const selectTransactionsError: MemoizedSelector<object, any> = createSelector(
  selectTransactionsState,
  getError
);

export const selectTransactionsIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectTransactionsState, getIsLoading);

export const selectTransactions: MemoizedSelector<
  object,
  ITransaction[]
  > = createSelector(selectTransactionsState, getTransactions);
