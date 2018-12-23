import { Action } from '@ngrx/store';
import {Message} from '../../models/messages/Message';

export const LOAD_MESSAGES = '[ACP] Load Messages';
export const LOAD_MESSAGES_ERROR = '[ACP] Load Messages Error';
export const LOAD_MESSAGES_SUCCESS = '[ACP] Load Messages Success';

export class LoadMessages implements Action {
  readonly type = LOAD_MESSAGES;
}

export class LoadMessagesError implements Action {
  readonly type = LOAD_MESSAGES_ERROR;
  constructor (public payload: any) {}
}

export class LoadMessageSuccess implements Action {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor (public payload: Message[]) {}
}


export type MessagesAction = LoadMessages | LoadMessagesError | LoadMessageSuccess;
