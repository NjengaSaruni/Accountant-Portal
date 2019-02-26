import {TransactionsState} from '../../modules/dashboard/store';
import {LoadingState} from '../../modules/shared/store/selector';

export interface RootState {
  transactionsState: TransactionsState.TransactionsState;
  loaderState: LoadingState;
}
