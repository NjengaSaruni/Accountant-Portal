import * as loader from '../actions/loader.actions';

export interface LoaderState {
  active: number;
  actionsInProgress: any[];
}
const initialState: LoaderState = {
  active: 0,
  actionsInProgress: []
};

export function reducers(state = initialState, action: any): LoaderState {
  switch (action.type) {
    case loader.SHOW_LOADER: {
      const isActionAlreadyInProgress = state.actionsInProgress.filter(
        (currentAction: any) => currentAction === action.payload.type
      ).length;

      // If the action in already in progress and is registered
      // we don't modify the state
      if (isActionAlreadyInProgress) {
        return state;
      }
      // Adding the action type in our actionsInProgress array
      const newActionsInProgress = [
        ...state.actionsInProgress,
        action.payload.type
      ];

      return Object.assign(state, {
        active: newActionsInProgress.length,
        actionsInProgress: newActionsInProgress
      });
    }
    case loader.HIDE_LOADER: {
      // We remove trigger action from actionsInProgress array
      const newActionsInProgress = action.payload.triggerAction
        ? state.actionsInProgress.filter(
          (currentAction: any) =>
            currentAction !== action.payload.triggerAction
        )
        : state.actionsInProgress;

      return Object.assign(state, {
        actionsInProgress: newActionsInProgress,
        active: state.active > 0 ? newActionsInProgress.length : 0
      });
    }
    default:
      return state;
  }
}

export const isLoaderActive = (state: LoaderState) => state.active;
