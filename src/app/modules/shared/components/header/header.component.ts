import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../loader/loader.service';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/store';
import {Observable} from 'rxjs';
import {RootState} from '../../../../core/store/state';
import {dashboardEffects} from '../../../dashboard/store/effects';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = this.store$.pipe(select(fromAuth.getLoggedIn));
  showLoader = 0;

  constructor(
    public loaderService: LoaderService,
    private store$: Store<RootState>
  ) { }

  ngOnInit() {
    this.store$.subscribe(
      data => this.showLoader = data['loader'].active
    );
  }


  signOut() {
    localStorage.removeItem('token');
    this.store$.dispatch(new fromAuth.Logout());
  }
}
