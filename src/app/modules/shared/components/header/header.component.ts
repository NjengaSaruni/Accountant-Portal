import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

}
