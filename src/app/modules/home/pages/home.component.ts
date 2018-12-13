import {Component, OnInit} from '@angular/core';
import {BarGraph} from '../../../common/models/graphs/BarGraph';
import {randomInt} from '../../../common/utils/randomInt';
import {Bar} from '../../../common/models/graphs/Bar';

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
    graph.title = `Bar Graph A`;
    graph.subtitle = `A graph of weekly expenditure in Kshs`;

    graph.line.pattern = [15, 3, 3, 3];
    graph.line.width = 0.3;
    graph.line.color = '#1945ff';

    // graph.backgroundColor = '#2c2c2c';
    for (let i = 1; i <= 6; i++) {
      const w = 800 / 10;
      // TODO debug effect of random height on bar display
      const bar: Bar = new Bar(randomInt(0, 700), w);
      bar.title = `Bar ${i}`;
      graph.add(bar);
    }

    const graph1 = new BarGraph();
    this.graphs.push(graph1);
    graph1.title = `Bar Graph B`;
    graph1.subtitle = `A graph of monthly expenditure in Kshs`;
    graph1.line.pattern = [4, 8];
    for (let i = 1; i <= 12; i++) {
      const w = 800 / 10;
      const bar: Bar = new Bar(randomInt(0, 300), w);
      bar.title = `Bar ${i}`;
      graph1.add(bar);
    }
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
  }

}
