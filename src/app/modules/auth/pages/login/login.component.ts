import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private store: Store<fromAuth.AuthState>) {}
  ngOnInit() {
  }
}
