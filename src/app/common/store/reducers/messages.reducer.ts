import * as fromMessages from '../actions/messages.action';
import {Message} from '../../models/messages/Message';

export interface IMessageState {
  entities: { [id: number]: Message};
  loaded: boolean;
  loading: boolean;
}

const initialState: IMessageState = {
  entities: {},
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
      const messages = action.payload;
      const entities = messages.reduce((_entities: {[id: number]: Message}, message: Message) => {
        return {
          ..._entities,
          [message.id]: message
        };
      }, {
        ...state.entities
      });
      return {
        ...state,
        entities,
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
export const getMessagesEntities = (state: IMessageState) => state.entities;
