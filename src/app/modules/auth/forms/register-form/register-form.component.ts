import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  profileForm: FormGroup;
  formLabels: any = {email: false, password: false};

  constructor(private loaderService: LoaderService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
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
    if (this.profileForm.invalid) {
      return;
    }
    this.loaderService.show();
    setTimeout(() => {
      this.authService.register(
        this.profileForm.get('email').value,
        this.profileForm.get('password').value,
        this.profileForm.get('password').value,
      ).subscribe(
        data => {
          this.loaderService.hide();
        },
        error => {
          this.loaderService.hide();
        }
      );
    }, 0);
  }
}
