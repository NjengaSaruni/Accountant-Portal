/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import {createSelector} from '@ngrx/store';
import * as fromLoader from './reducers/loader.reducers';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

export interface State {
  loading: fromLoader.State
}

export const reducers = {
  loading: fromLoader.reducer
};


export const getLoadingState = (state: State) => state.loading;

export const isLoaderActive = createSelector(
  getLoadingState,
  fromLoader.isLoaderActive
);
