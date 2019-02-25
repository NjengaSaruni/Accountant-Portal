import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from './auth.service';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../store/reducers';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store$: Store<fromAuth.AuthState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn$: Observable<boolean> = this.store$.pipe(select(fromAuth.getLoggedIn));
    loggedIn$.subscribe(
      status => {
        if (status) { return true; }
        this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url }});
      }
    );
    // not logged in so redirect to login page with the return url
    return true;
  }
}
