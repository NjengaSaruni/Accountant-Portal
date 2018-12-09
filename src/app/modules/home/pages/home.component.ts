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
    this.graphs[0].bars = [];
    this.graphs[0].title = `Bar Graph A`;
    for (let i = 1; i <= 5; i++) {
      const w = 800 / 10;
      const bar: Bar = new Bar(randomInt(0, 300), w);
      this.graphs[0].add(bar);
      this.graphs[0].width += w;
    }

    this.graphs.push(new BarGraph());
    this.graphs[1].title = `Bar Graph B`;
    this.graphs[1].bars = [];
    for (let i = 1; i <= 10; i++) {
      const w = 800 / 10;
      const bar: Bar = new Bar(randomInt(0, 300), w);
      this.graphs[1].add(bar);
      this.graphs[1].width += w;
    }
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
  }

}
