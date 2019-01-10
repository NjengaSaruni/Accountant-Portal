import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {Store} from '@ngrx/store';
import {IRegistrationPayload} from '../../models/user';
import * as fromAuth from '../../store';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  profileForm: FormGroup;
  formLabels: any = {email: false, password: false};

  constructor(private loaderService: LoaderService,
              private formBuilder: FormBuilder,
              private store: Store<fromAuth.AuthState>
  ) {
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: new FormControl(
        '',
        [
          Validators.email,
          Validators.required
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.minLength(8),
          Validators.required
        ]
      ),
    });
  }

  signUp() {
    this.loaderService.show();

    const registrationPayload = <IRegistrationPayload> {
      email: this.profileForm.get('email').value,
      password1: this.profileForm.get('password').value,
      password2: this.profileForm.get('password').value
    };

    this.store.dispatch(new fromAuth.Register(registrationPayload));
  }
}
