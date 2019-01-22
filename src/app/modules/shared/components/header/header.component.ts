import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../loader/loader.service';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(
    public loaderService: LoaderService,
    private store: Store<fromAuth.AuthState>
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.store.dispatch(new fromAuth.Logout());
  }
}
