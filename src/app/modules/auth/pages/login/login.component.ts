import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../store/reducers';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private store: Store<fromAuth.AuthState>,
              private router: Router,
              private titleService: Title) {}
  ngOnInit() {
    this.titleService.setTitle('iSave | Account | Login');

    this.loggedIn$.subscribe(
      state => {
        if (state) {
          this.router.navigate(['dashboard']);
        }
      }
    );
  }
}
