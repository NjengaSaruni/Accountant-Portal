import {TransactionsState} from '../../modules/dashboard/store';
import {LoadingState} from '../../modules/shared/store/selector';
import {LimitsState} from '../../modules/dashboard/store/state';

export interface RootState {
  limitsState: LimitsState;
  transactionsState: TransactionsState.TransactionsState;
  loaderState: LoadingState;
}
