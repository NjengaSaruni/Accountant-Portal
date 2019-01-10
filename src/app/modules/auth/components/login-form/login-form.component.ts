import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {IAuthenticationPayload} from '../../models/user';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  formLabels: any = {email: false, password: false};


  constructor(private formBuilder: FormBuilder,
              private loaderService: LoaderService,
              private store: Store<fromAuth.AuthState>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
          Validators.required
        ]
      ),
    });
  }

  signIn() {
    this.loaderService.show();
    const authenticationPayload = <IAuthenticationPayload> {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.store.dispatch(new fromAuth.Login(authenticationPayload));
  }
}
