import {initialState, TransactionsState} from '../state';
import {TransactionActions, TransactionActionTypes} from '../actions';

export function reducers(state = initialState, action: TransactionActions): TransactionsState {
  switch (action.type) {

    case TransactionActionTypes.TRANSACTION_LOAD: {
      return {
        ...state,
        loading: true
      };
    }
    case TransactionActionTypes.TRANSACTION_LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case TransactionActionTypes.TRANSACTION_LOAD_SUCCESS: {
      console.log(action);
      const transactions = [...action.payload];
      return {
        ...state,
        transactions,
        loading: false,
        loaded: true
      };
    }

    // TODO ADD CASES
    case TransactionActionTypes.TRANSACTION_ADD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TransactionActionTypes.TRANSACTION_ADD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case TransactionActionTypes.TRANSACTION_ADD_SUCCESS: {
      const transactions = [action.payload, ...state.transactions ];
      return {
        ...state,
        transactions,
        loading: false,
        loaded: true
      };
    }

    // TO DO UPDATE CASES
    case TransactionActionTypes.TRANSACTION_UPDATE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TransactionActionTypes.TRANSACTION_UPDATE_FAIL: {
      return state;
    }

    // TODO deal with update
    // case TransactionActionTypes.TRANSACTION_UPDATE_SUCCESS: {
    //   const transaction = state.transactions.map(_transaction => {
    //     if (_transaction.id === action.payload.id) {
    //       return action.payload;
    //     } else {
    //       return transaction;
    //     }
    //   });
    //   return {
    //     ...state,
    //     transaction,
    //     loaded: true,
    //     loading: false
    //   };
    // }
    //   TODO deal with removal
    case TransactionActionTypes.TRANSACTION_DELETE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TransactionActionTypes.TRANSACTION_DELETE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case TransactionActionTypes.TRANSACTION_DELETE_SUCCESS: {
      const transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      console.log(transactions);
      return {
        ...state,
        transactions,
        loading: false,
        loaded: true
      };
    }
    // default return if case not match
  }
  return state;
}
