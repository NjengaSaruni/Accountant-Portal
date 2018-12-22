import * as fromMessages from './messages.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ACPSState {
  messages: fromMessages.IMessageState;
}

export const reducers: ActionReducerMap<ACPSState> = {
  messages: fromMessages.reducer,
};

export const getACPState = createFeatureSelector<ACPSState> (
  'acp'
);

// message State
export const getMessageState = createSelector (
  getACPState,
  (state: ACPSState) => state.messages
);

export const getAllMessages = createSelector (
  getMessageState,
  fromMessages.getMessages
);

export const getMessagesLoaded = createSelector (
  getMessageState,
  fromMessages.getMessagesLoaded
);

export const getMessagesLoading = createSelector (
  getMessageState,
  fromMessages.getMessagesLoading
);
