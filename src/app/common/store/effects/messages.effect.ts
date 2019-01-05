import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';

import {Actions, Effect, ofType} from '@ngrx/effects';
import * as messageActions from '../actions/messages.action';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {MessageService} from '../../services/message.service';


@Injectable()
export class MessagesEffect {
  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) {}

  @Effect()
  createMessages$: Observable<Action> = this.actions$.pipe(
    ofType(messageActions.LOAD_MESSAGES),
    switchMap(() => {
      return this.messageService.getMessages()
        .pipe(
          map((messages) => {
            return new messageActions.LoadMessageSuccess(messages);
          })
        );
    })
  );
}
