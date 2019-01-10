import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromAuth from '../../store';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: Store<fromAuth.AuthState>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
        EffectsModule
      ],
      providers: [
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
      });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      email: 'john@doe.com',
      password: 'john!@#'
    });
    fixture.detectChanges();
  });

  // create reusable function for a dry spec.
  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form value should update from form changes', fakeAsync(() => {
    updateForm('john@doe.com', 'john!@#');
    expect(component.loginForm.value).toEqual({
      email: 'john@doe.com',
      password: 'john!@#'
    });
  }));

  it('should dispatch a login event on submit', () => {
    updateForm('john@doe.com', 'john!@#');
    const $event: any = {
      email: 'john@doe.com',
      password: 'john!@#'
    };
    const action = new fromAuth.Login($event);

    component.signIn();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
