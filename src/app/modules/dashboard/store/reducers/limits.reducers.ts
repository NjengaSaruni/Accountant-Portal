import {initialLimitsState, LimitsState} from '../state';
import {LimitActions, LimitActionTypes} from '../actions';

export function limitsReducers(state = initialLimitsState, action: LimitActions): LimitsState {
  switch (action.type) {

    case LimitActionTypes.LIMIT_LOAD: {
      return {
        ...state,
        loading: true
      };
    }
    case LimitActionTypes.LIMIT_LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case LimitActionTypes.LIMIT_LOAD_SUCCESS: {
      const limits = [...action.payload];
      return {
        ...state,
        limits,
        loading: false,
        loaded: true
      };
    }

    // TODO ADD CASES
    case LimitActionTypes.LIMIT_ADD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case LimitActionTypes.LIMIT_ADD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case LimitActionTypes.LIMIT_ADD_SUCCESS: {
      const limits = [action.payload, ...state.limits ];
      return {
        ...state,
        limits,
        loading: false,
        loaded: true
      };
    }

    // TO DO UPDATE CASES
    case LimitActionTypes.LIMIT_UPDATE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case LimitActionTypes.LIMIT_UPDATE_FAIL: {
      return state;
    }

    // TODO deal with update
    // case LimitActionTypes.LIMIT_UPDATE_SUCCESS: {
    //   const limit = state.limits.map(_limit => {
    //     if (_limit.id === action.payload.id) {
    //       return action.payload;
    //     } else {
    //       return limit;
    //     }
    //   });
    //   return {
    //     ...state,
    //     limit,
    //     loaded: true,
    //     loading: false
    //   };
    // }
    //   TODO deal with removal
    case LimitActionTypes.LIMIT_DELETE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case LimitActionTypes.LIMIT_DELETE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case LimitActionTypes.LIMIT_DELETE_SUCCESS: {
      const limits = state.limits.filter(limit => limit.id !== action.payload);
      return {
        ...state,
        limits,
        loading: false,
        loaded: true
      };
    }
    // default return if case not match
  }
  return state;
}
