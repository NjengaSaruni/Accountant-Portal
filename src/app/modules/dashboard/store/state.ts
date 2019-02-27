import {ITransaction} from '../models/Transaction.model';

export interface TransactionsState {
  transactions: ITransaction[];
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
