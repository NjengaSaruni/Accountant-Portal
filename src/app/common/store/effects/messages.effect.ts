import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';

import {Actions, Effect, ofType} from '@ngrx/effects';
import * as messageActions from '../actions/messages.action';
import {MessageService} from '../../services/message.service';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';


@Injectable()
export class MessagesEffect {
  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) {}

  @Effect()
  createMessages$: Observable<Action> = this.actions$.pipe(
    ofType(messageActions.CREATE_MESSAGES),
    switchMap(() => {
      return this.messageService.getMessages()
        .pipe(
          map((messages) => {
            return new messageActions.CreateMessages(messages);
          })
        );
    })
  );
}
