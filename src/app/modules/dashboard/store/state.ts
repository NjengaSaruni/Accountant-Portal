import {ITransaction} from '../models/Transaction.model';

export interface State {
  transactions: ITransaction[] | [];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  transactions: [],
  isLoading: false,
  error: null
};
