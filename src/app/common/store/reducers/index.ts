import * as fromMessages from '../reducers/messages.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ReportsState {
  messages: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<ReportsState> = {
  messages: fromMessages.reducer,
};

export const getReportsState = createFeatureSelector<ReportsState> (
  'reports'
);

// message State
export const getMessageState = createSelector (
  getReportsState,
  (state: ReportsState) => state.messages
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
