import {Component, OnInit} from '@angular/core';
import {Bar, BarGraph} from '../../../shared/models/BarGraph';

declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graph: BarGraph;
  max = 10 ** 2;
  width = 1000;
  height = 600;
  constructor() { }

  async ngOnInit() {
    this.graph = new BarGraph();
    this.graph.bars = [];
    for (let i = 1; i <= 10; i++) {
      this.graph.add(new Bar((Math.ceil(i ** 2 / this.max * 100))));
    }

    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
  }

}
