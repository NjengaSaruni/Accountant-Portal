import * as fromMessages from '../actions/messages.action';
import {Message} from '../../models/messages/Message';

export interface IMessageState {
  data: Message[];
  loaded: boolean;
  loading: boolean;
}

const initialState: IMessageState = {
  data: [
    new Message('This is the message title')
  ],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMessages.MessagesAction
): IMessageState {

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
        data: action.payload,
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

export const getMessagesLoading =  (state: IMessageState) => state.loading;
export const getMessagesLoaded = (state: IMessageState) => state.loaded;
export const getMessages = (state: IMessageState) => state.data;
