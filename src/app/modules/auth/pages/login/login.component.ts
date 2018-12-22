import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../common/store';
import {Message} from '../../../../common/models/messages/Message';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private store: Store<fromStore.ACPSState>) { }

  ngOnInit() {
    this.messages$ = this.store.select(fromStore.getAllMessages);
    this.store.dispatch(new fromStore.LoadMessages());
  }

}
