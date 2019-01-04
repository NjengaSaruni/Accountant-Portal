import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get apiHost(): string {
    return this._apiHost;
  }

  set apiHost(value: string) {
    this._apiHost = value;
  }
  private _apiHost = 'http://localhost:8000/api/v1/';
  constructor() { }
}
