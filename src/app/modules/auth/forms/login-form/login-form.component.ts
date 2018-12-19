import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  formLabels: any = {email: false, password: false};


  constructor(private formBuilder: FormBuilder,
              private loaderService: LoaderService) { }

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
    if (this.loginForm.invalid) {
      return;
    }
  }
}
