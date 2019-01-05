import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatButtonModule, MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Title} from '@angular/platform-browser';

describe('AppComponent', () => {
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: Title, useClass: Title }],

    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Accountant | Home'`, () => {
    titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('Accountant | Home');
  });

  xit('should render company name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(
      'body > app-root > app-home > div.raised.top-header > app-header > div > div > div.navigation > nav > div > p > span.color-p')
      .textContent).toContain('Account');
  });
});
