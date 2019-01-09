import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../shared/services/settings.service';

describe('AuthService', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let settingsSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthService,
      { provide: HttpClient, useValue: httpSpy },
      { provide: SettingsService, useValue: settingsSpy },
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
