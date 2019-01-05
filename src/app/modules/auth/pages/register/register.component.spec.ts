import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {Component} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, MockRegisterFormComponent ],
      imports: [
        SharedModule,
        AngularFontAwesomeModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({selector: 'app-register-form', template: ''})
class MockRegisterFormComponent {

}
