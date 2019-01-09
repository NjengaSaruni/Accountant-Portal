import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { IUser } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: IUser | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
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
export const getUser = (state: State) => state.user;
