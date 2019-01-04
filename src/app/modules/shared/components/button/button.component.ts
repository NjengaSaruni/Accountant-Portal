import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text;
  @Input() background = '#0e5a77';
  @Input() color = '#fff';
  @Input() fontSize = 17;
  @Input() width = 240;
  @Input() height = 50;
  @Input() disabled = false;
  @Input() fullWidth: false;

  constructor() { }

  ngOnInit() {
  }

}
