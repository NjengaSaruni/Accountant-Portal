import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import * as fromReducers from './reducers';

export interface LoadingState {
  loading: fromReducers.LoaderState
}

export const reducers = {
  loading: fromReducers.reducers
};

export const getLoadingState = (state: LoadingState) => state.loading;

export const getLoader = createSelector(
  getLoadingState,
  fromReducers.isLoaderActive
);
