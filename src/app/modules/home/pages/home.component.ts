import {Component, OnInit} from '@angular/core';
import {Bar, BarGraph} from '../../../shared/models/BarGraph';
import {randomInt} from '../../../shared/utils/randomInt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graphs: BarGraph[] = [];
  constructor() { }

  async ngOnInit() {
    this.graphs.push(new BarGraph());
    const graph = this.graphs[0];
    graph.bars = [];
    graph.title = `Bar Graph A`;
    graph.subtitle = `A graph of weekly expenditure in Kshs`;
    for (let i = 1; i <= 6; i++) {
      const w = 800 / 10;
      // TODO debug effect of random height on bar display
      const bar: Bar = new Bar(randomInt(0, 700), w);
      bar.title = `Bar ${i}`;
      graph.add(bar);
    }
    this.graphs.push(new BarGraph());
    this.graphs[1].title = `Bar Graph B`;
    this.graphs[1].subtitle = `A graph of monthly expenditure in Kshs`;
    this.graphs[1].bars = [];
    for (let i = 1; i <= 10; i++) {
      const w = 800 / 10;
      const bar: Bar = new Bar(randomInt(0, 300), w);
      bar.title = `Bar ${i}`;
      this.graphs[1].add(bar);
    }
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
  }

}
