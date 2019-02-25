import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import {LoaderState} from './reducers';

const getLoader = (state: LoaderState): number => state.active;

export const selectLoaderState: MemoizedSelector<
  object,
  LoaderState
  > = createFeatureSelector<LoaderState>('loader');

export const selectLoader: MemoizedSelector<
  object,
  number
  > = createSelector(selectLoaderState, getLoader);

