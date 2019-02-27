import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../shared/services/settings.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get registrationAPI(): string {
    return this.settings.apiHost + 'rest-auth/registration/';
  }

  get loginAPI(): string {
    return this.settings.apiHost + 'rest-auth/login/';
  }

  set registrationAPI(value: string) {
    this._registrationAPI = value;
  }

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  private _registrationAPI: string;
  private _loginAPI: string;

  constructor(private _http: HttpClient, private settings: SettingsService) {
  }

  /**
   * if we have token the user is loggedIn
   * @returns Whether the user has a token in localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   *  LOGIN the user then tell all the subscribers about the new status
   */
  login(email: string, password: string): Observable<{key: string}> {
    return this._http.post<{key: string}>(this.loginAPI, {
      'email': email,
      'password': password
    });
  }
  /**
   *  Register the user then tell all the subscribers about the new status
   */
  register(email: string, password1: string, password2: string): Observable<any> {
    return this._http.post(this.registrationAPI, {
      email, password1, password2
    });
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
