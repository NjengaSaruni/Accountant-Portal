import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};


export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };

    case AuthActionTypes.LOGOUT_CONFIRMED:
      return initialState; // the initial state has isLoggedIn set to false

    case AuthActionTypes.LOGIN_FAILURE:
      console.log(state);
      console.log('Failed');
      return initialState; // the initial state has isLoggedIn set to false

    default:
      return state;
  }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
