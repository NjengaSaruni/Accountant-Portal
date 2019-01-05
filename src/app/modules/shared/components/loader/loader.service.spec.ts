import {TestBed} from '@angular/core/testing';

import {LoaderService} from './loader.service';

describe('LoaderService', () => {
  let loaderServiceSpy: LoaderService;
  beforeEach(() => { loaderServiceSpy = new LoaderService(); });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LoaderService, useValue: loaderServiceSpy}
    ]
  }));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });
});
