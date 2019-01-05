import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import {HttpClient} from '@angular/common/http';

describe('MessageService', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: httpSpy}
    ]
  }));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });
});
