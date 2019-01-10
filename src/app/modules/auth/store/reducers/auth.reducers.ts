import {AuthActions, AuthActionTypes} from '../actions';
import {RESTAuthToken} from '../../models/user';

export interface State {
  loggedIn: boolean;
  token: RESTAuthToken;
}

export const initialState: State = {
  loggedIn: false,
  token: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload,
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
