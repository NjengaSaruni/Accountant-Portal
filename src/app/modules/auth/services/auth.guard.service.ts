import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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

        // not logged in so redirect to login page with the return url
        this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url }});
      }
    );
    return true;
  }
}
