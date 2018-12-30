import {Component, OnInit} from '@angular/core';
import {BarGraph} from '../../graphs/models/BarChart/BarGraph';
import {randomColor, randomInt} from '../../../common/utils/randomInt';
import {Bar} from '../../graphs/models/BarChart/Bar';
import {PieChart} from '../../graphs/models/PieChart/PieChart';
import {PieDataObject} from '../../graphs/models/PieChart/PieDataObject';
import {LineChart} from '../../graphs/models/LineChart/LineChart';
import {LineChartPointDataObject} from '../../graphs/models/LineChart/LineChartPointDataObject';

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
      new PieDataObject('Shopping', randomInt(1, 400), randomColor()),
      new PieDataObject('Uber', randomInt(1, 400), randomColor()),
      new PieDataObject('Utilities', randomInt(1, 400), randomColor()),
      new PieDataObject('Food', randomInt(1, 10), randomColor()),
      new PieDataObject('Rent', randomInt(1, 10), randomColor()),
      new PieDataObject('Others', randomInt(1, 1000), randomColor()),
    ]);

    this.lineChart = new LineChart(800, 500);
    this.lineChart.title = 'A sample line chart';
    this.lineChart.populate([
        new LineChartPointDataObject('Jan', randomInt(350, 400)),
        new LineChartPointDataObject('Feb', randomInt(350, 400)),
        new LineChartPointDataObject('Mar', randomInt(350, 400)),
        new LineChartPointDataObject('Apr', randomInt(40, 400)),
        new LineChartPointDataObject('May', randomInt(0, 400)),
        new LineChartPointDataObject('Jun', randomInt(350, 400)),
        new LineChartPointDataObject('Jul', randomInt(350, 400)),
        new LineChartPointDataObject('Aug', randomInt(6, 400)),
        new LineChartPointDataObject('Sep', randomInt(350, 400)),
        new LineChartPointDataObject('Oct', randomInt(350, 400)),
        new LineChartPointDataObject('Nov', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(4, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(56, 400)),
        new LineChartPointDataObject('Dec', randomInt(23, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
        new LineChartPointDataObject('Dec', randomInt(350, 400)),
      ]
    );
    this.lineChart.line.color = '#fa8967';
    // this.lineChart.line.width = 9;
  }

}


