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
    this.graph = new BarGraph();
    for (let i = 0; i < 10; i++) {
      const bar: Bar = new Bar(i ** 2);
      this.graph.bars[i] = bar;
    }

    console.log(this.graph.bars);
  }

}
