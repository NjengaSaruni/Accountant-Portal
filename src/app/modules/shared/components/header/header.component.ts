import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../loader/loader.service';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/store';
import {Observable} from 'rxjs';
import {RootState} from '../../../../core/store/state';
import {selectLoader} from '../../store/selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = this.store$.pipe(select(fromAuth.getLoggedIn));
  isLoading$: Observable<any>;


  constructor(
    public loaderService: LoaderService,
    private store$: Store<RootState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store$.pipe(
      select(selectLoader)
    );

    this.isLoading$.subscribe(data => console.log(data));

  }


  signOut() {
    localStorage.removeItem('token');
    this.store$.dispatch(new fromAuth.Logout());
  }
}
