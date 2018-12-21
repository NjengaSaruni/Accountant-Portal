import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../common/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<fromStore.ReportsState>) { }

  ngOnInit() {
    this.store.select(fromStore.getAllMessages).subscribe(
      state => console.log(state),
    );
  }

}
