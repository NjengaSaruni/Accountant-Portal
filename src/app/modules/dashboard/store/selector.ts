import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { TransactionsState } from './state';
import {ITransaction} from '../models/Transaction.model';

const getError = (state: TransactionsState): any => state.error;

const getLoading = (state: TransactionsState): boolean => state.loading;

const getLoaded = (state: TransactionsState): boolean => state.loaded;

const getTransactions = (state: TransactionsState): any => state.transactions;

export const selectTransactionsState: MemoizedSelector<
  object,
  TransactionsState
  > = createFeatureSelector<TransactionsState>('transactions');

export const selectTransactionsError: MemoizedSelector<object, any> = createSelector(
  selectTransactionsState,
  getError
);

export const selectTransactionsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectTransactionsState, getLoading);

export const selectTransactionsLoaded: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectTransactionsState, getLoaded);

export const selectTransactions: MemoizedSelector<
  object,
  ITransaction[]
  > = createSelector(selectTransactionsState, getTransactions);
