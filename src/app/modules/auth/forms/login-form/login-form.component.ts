import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {Observable} from 'rxjs';
import {Message} from '../../../../common/models/messages/Message';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../../common/store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  formLabels: any = {email: false, password: false};
  messages$: Observable<Message[]>;



  constructor(private formBuilder: FormBuilder,
              private loaderService: LoaderService,
              private store: Store<fromStore.ACPSState>
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

    this.messages$ = this.store.select(fromStore.getAllMessages);
  }

  signIn() {
    this.loaderService.show();
    this.store.dispatch(new fromStore.LoadMessages());

    if (this.loginForm.invalid) {
    }
  }

}
