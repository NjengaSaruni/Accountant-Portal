import {ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {LimitsState, TransactionsState} from '../state';
import {ITransaction} from '../../models/Transaction.model';
import * as fromAuth from '../../../auth/store/reducers/auth.reducers';
import * as fromRegister from '../../../auth/store/reducers/register.reducers';
import {AuthState} from '../../../auth/store/reducers';
import {limitsReducers} from './limits.reducers';
import {transactionsReducers} from './transactions.reducers';

export interface FinanceState {
  limits: LimitsState;
  transactions: TransactionsState;
}

// export const selectFinanceState = createFeatureSelector<FinanceState>('finance');
export const selectFinanceState: MemoizedSelector<
  object,
  FinanceState
  > = createFeatureSelector<FinanceState>('finance');


export const selectTransactionsState = createSelector(
  selectFinanceState,
  (state: FinanceState) => state.transactions
);

export const selectLimitsState = createSelector(
  selectFinanceState,
  (state: FinanceState) => state.limits
);

const getTransactionsError = (state: TransactionsState): any => state.error;

const getTransactionsLoading = (state: TransactionsState): boolean => state.loading;

const getTransactionsLoaded = (state: TransactionsState): boolean => state.loaded;

const getTransactions = (state: TransactionsState): any => state.transactions;

export const selectTransactionsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectTransactionsState, getTransactionsLoading);

export const selectTransactionsLoaded: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectTransactionsState, getTransactionsLoaded);

export const selectTransactions: MemoizedSelector<
  object,
  ITransaction[]
  > = createSelector(selectTransactionsState, getTransactions);


export const reducers: ActionReducerMap<FinanceState> = {
  limits: limitsReducers,
  transactions: transactionsReducers
};
