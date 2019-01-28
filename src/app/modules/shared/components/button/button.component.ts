import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text;
  @Input() background = '#6EC4DB';
  @Input() color = '#fff';
  @Input() fontSize = 17;
  @Input() width = 240;
  @Input() height = 50;
  @Input() disabled = false;
  @Input() fullWidth: false;
  @Input() raised = false;
  @Input() circular = false;
  @Input() icon = '';

  borderRadius: number;

  constructor() {}

  ngOnInit() {
    if (this.circular) {
      this.borderRadius = this.height;
    }
  }

}
