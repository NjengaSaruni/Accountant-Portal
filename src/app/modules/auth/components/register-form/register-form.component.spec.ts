import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {RegisterFormComponent} from './register-form.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromAuth from '../../store';
import {EffectsModule} from '@ngrx/effects';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {IAuthenticationPayload, IRegistrationPayload} from '../../models/user';
import {mockAuthenticationPayload} from '../login-form/login-form.component.spec';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let store: Store<fromAuth.AuthState>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
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
        fixture = TestBed.createComponent(RegisterFormComponent);
        component = fixture.componentInstance;
      });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    component.profileForm = formBuilder.group(mockAuthenticationPayload);
    fixture.detectChanges();
  });


  // create reusable function for a dry spec.
  function updateForm(userEmail, userPassword) {
    component.profileForm.controls['email'].setValue(userEmail);
    component.profileForm.controls['password'].setValue(userPassword);
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form value should update from form changes', fakeAsync(() => {
    updateForm(
      mockAuthenticationPayload.email,
      mockAuthenticationPayload.password,
    );
    expect(component.profileForm.value).toEqual(mockAuthenticationPayload);
  }));

  it('should dispatch a register event on submit', () => {
    updateForm(mockAuthenticationPayload.email, mockAuthenticationPayload.password);

    const $event: any = <IRegistrationPayload> {
      email: mockAuthenticationPayload.email,
      password1: mockAuthenticationPayload.password,
      password2: mockAuthenticationPayload.password,
    };
    const action = new fromAuth.Register($event);

    component.signUp();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
