import * as fromMessages from '../actions/messages.action';
import {Message} from '../../models/messages/Message';

export interface MessageState {
  data: Message[];
  loaded: boolean;
  loading: boolean;
}

const initialState: MessageState = {
  data: [
    new Message('This is the message title')
  ],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMessages.MessagesAction
): MessageState {

  switch (action.type) {
    case (fromMessages.LOAD_MESSAGES): {
      return {
        ...state,
        loading: true
      };
    }

    case (fromMessages.LOAD_MESSAGES_SUCCESS): {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case (fromMessages.LOAD_MESSAGES_ERROR): {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getMessagesLoading =  (state: MessageState) => state.loading;
export const getMessagesLoaded = (state: MessageState) => state.loaded;
export const getMessages = (state: MessageState) => state.data;
