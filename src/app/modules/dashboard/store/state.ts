import {ITransaction} from '../models/Transaction.model';
import {ILimit} from '../models/Limit.model';

export interface TransactionsState {
  transactions: ITransaction[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface LimitsState {
  limits: ILimit[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  loaded: false,
  error: null
};


export const initialLimitsState: LimitsState = {
  limits: [],
  loading: false,
  loaded: false,
  error: null
};
