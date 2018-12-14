import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
  }

  signUp() {
    this.loaderService.hide();
  }
}
