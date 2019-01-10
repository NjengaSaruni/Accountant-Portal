import {RegisterActions, RegisterActionTypes} from '../actions';
import {RESTAuthToken} from '../../models/user';

export interface State {
  registered: boolean;
  token: RESTAuthToken;
}

export const initialState: State = {
  registered: false,
  token: null,
};

export function reducer(state = initialState, action: RegisterActions): State {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        registered: true,
        token: action.payload,
      };
    }

    case RegisterActionTypes.REGISTER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
