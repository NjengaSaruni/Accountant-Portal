import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {LoaderState} from '../../../../common/models/auth';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = false;

  constructor() { }

  show() {
    this.loaderState = true;
  }

  hide() {
    this.loaderState = false;
  }
}
