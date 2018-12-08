import {Component, OnInit} from '@angular/core';
import {Bar, BarGraph} from '../../../shared/models/BarGraph';
import {randomInt} from '../../../shared/utils/randomInt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graph: BarGraph;
  width = 1600;
  height = 600;
  barWidth = 100;
  constructor() { }

  async ngOnInit() {
    this.graph = new BarGraph();
    this.graph.bars = [];
    for (let i = 1; i <= 20; i++) {
      this.graph.add(new Bar(randomInt(0, 300), 1000 / 20));
    }

    this.barWidth = 1000 / 20;
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
  }

}
