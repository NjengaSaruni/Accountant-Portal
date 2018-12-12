import {Component, Input, OnInit} from '@angular/core';
import {BarGraph} from '../../../../common/models/graphs/BarGraph';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input() graph: BarGraph;
  @Input() max: number;

  constructor(
  ) { }

  ngOnInit(
  ) {
  }

}
