import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {
  }

  /**
   * if we have token the user is loggedIn
   * @returns Whether the user has a token in localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(): void {
    localStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true);
  }


  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }


  /**
   *
   * @returns An Observable of the user's logged in status
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
