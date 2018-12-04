import { Component, OnInit } from '@angular/core';
import {Bar, BarGraph} from '../models/BarGraph';
import {range} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graph: BarGraph;

  constructor() { }

  async ngOnInit() {
    for (const i of await range(0, 10)) {
      const bar: Bar = new Bar(i ** 2);
      this.graph.bars[i] = bar;
    }
  }

}
