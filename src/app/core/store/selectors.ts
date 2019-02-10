import { createSelector, MemoizedSelector } from '@ngrx/store';
import {TransactionsSelectors} from '../../modules/dashboard/store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  TransactionsSelectors.selectTransactionsError,
  (transactionsError: string) => {
    return transactionsError;
  }
);

export const selectLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(
  TransactionsSelectors.selectTransactionsLoading,
  (transactions: boolean) => {
    return transactions;
  }
);

export const selectLoaded: MemoizedSelector<
  object,
  boolean
  > = createSelector(
  TransactionsSelectors.selectTransactionsLoaded,
  (transactions: boolean) => {
    return transactions;
  }
);
