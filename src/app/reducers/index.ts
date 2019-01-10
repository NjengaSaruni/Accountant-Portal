import {RouterStateUrl} from '../modules/shared/utils/utils';
import {ActionReducerMap} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;

}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};
