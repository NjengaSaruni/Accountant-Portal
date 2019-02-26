import {AuthActions, AuthActionTypes} from '../actions';
import {RESTAuthToken} from '../../models/user';

export interface State {
  loggedIn: boolean;
  token: RESTAuthToken;
}
const token = localStorage.getItem('token');
export const initialState: State = {
  loggedIn:  token !== null,
  token: <RESTAuthToken>{key: token}
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
      return { ...state,
      loggedIn: false,
      token: null
    };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
