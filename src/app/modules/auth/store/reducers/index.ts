import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromAuth from './auth.reducers';
import * as fromRegister from './register.reducers';

export interface AuthState {
  login: fromAuth.State;
  register: fromRegister.State;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoginState = createSelector(
  selectAuthState,
  (state: AuthState) => state.login
);

export const getLoggedIn = createSelector(
  selectAuthLoginState,
  fromAuth.getLoggedIn
);

export const reducers: ActionReducerMap<AuthState> = {
  login: fromAuth.reducer,
  register: fromRegister.reducer
};


