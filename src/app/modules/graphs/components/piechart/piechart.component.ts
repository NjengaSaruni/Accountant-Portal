import {Component, Input, OnInit} from '@angular/core';
import {BarGraph} from '../../../../shared/models/BarGraph';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input graph: BarGraph;
  constructor() { }

  ngOnInit() {
  }

}
