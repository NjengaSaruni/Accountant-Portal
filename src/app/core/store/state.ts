import {TransactionsState} from '../../modules/dashboard/store';
import {LoaderState} from '../../modules/shared/store/reducers';

export interface RootState {
  transactionsState: TransactionsState.TransactionsState;
  loaderState: LoaderState;
}
