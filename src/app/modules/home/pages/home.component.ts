import {Component, OnInit} from '@angular/core';
import {BarGraph} from '../../graphs/models/BarChart/BarGraph';
import {randomColor, randomInt} from '../../../common/utils/randomInt';
import {Bar} from '../../graphs/models/BarChart/Bar';
import {PieChart} from '../../graphs/models/PieChart/PieChart';
import {DataObject} from '../../graphs/models/BaseChart/DataObject';
import {LineChart} from '../../graphs/models/LineChart/LineChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graphs: BarGraph[] = [];
  pieChart: PieChart;
  lineChart: LineChart;

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

    this.pieChart = new PieChart(200, 80);
    this.pieChart.title = 'A simple pie chart';
    this.pieChart.subtitle = 'A graph of all transactions';
    this.pieChart.unit = 'KES';
    this.pieChart.populate([
      new DataObject('Shopping', randomInt(1, 400), randomColor()),
      new DataObject('Uber', randomInt(1, 400), randomColor()),
      new DataObject('Utilities', randomInt(1, 400), randomColor()),
      new DataObject('Food', randomInt(1, 10), randomColor()),
      new DataObject('Rent', randomInt(1, 10), randomColor()),
      new DataObject('Others', randomInt(1, 1000), randomColor()),
    ]);

    this.lineChart = new LineChart(800, 500);
    this.lineChart.title = 'A sample line chart';
    this.lineChart.subtitle = 'Money spent this year';
    this.lineChart.populate([
        new DataObject('Jan', randomInt(0, 120)),
        new DataObject('Feb', randomInt(0, 120)),
        new DataObject('Mar', randomInt(0, 120)),
        new DataObject('Apr', randomInt(0, 120)),
        new DataObject('May', randomInt(0, 1200)),
        new DataObject('Jun', randomInt(0, 120)),
        new DataObject('Jul', randomInt(0, 120)),
        new DataObject('Aug', randomInt(0, 12000)),
      ]
    );
    this.lineChart.line.color = randomColor();
    this.lineChart.line.width = 9;
  }

}


