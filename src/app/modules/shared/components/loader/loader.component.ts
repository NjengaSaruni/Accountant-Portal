import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderState} from '../../../../common/models/auth';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  constructor(
    private loaderService: LoaderService
  ) { }
  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
