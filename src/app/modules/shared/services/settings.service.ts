import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

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
  private _apiHost = environment.api;
}
