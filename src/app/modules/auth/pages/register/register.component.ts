import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signingUp: boolean;
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Accountant Plus | Register');
  }

}
