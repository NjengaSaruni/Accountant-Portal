import {Component, OnInit} from '@angular/core';
import {BarGraph} from '../../graphs/models/BarChart/BarGraph';
import {randomColor, randomInt} from '../../../common/utils/randomInt';
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
  data: DataObject[];

  constructor() { }

  async ngOnInit() {
    this.data = [
      new DataObject('Jan', randomInt(1, 4000), randomColor()),
      new DataObject('Feb', randomInt(1, 4000), randomColor()),
      new DataObject('March', randomInt(1, 4000), randomColor()),
      new DataObject('April', randomInt(1, 1000), randomColor()),
      new DataObject('May', randomInt(1, 1000), randomColor()),
      new DataObject('June', randomInt(1, 4000), randomColor()),
      new DataObject('July', randomInt(1, 4000), randomColor()),
    ];

    this.graphs.push(new BarGraph(800, 400));
    const graph = this.graphs[0];

    graph.title = `Bar Graph A`;
    graph.subtitle = `A graph of weekly expenditure in Kshs`;
    graph.line.pattern = [15, 3, 3, 3];
    graph.line.width = 0.3;
    graph.line.color = '#1945ff';
    graph.populate(this.data);

    this.graphs.push(graph);

    this.pieChart = new PieChart(200, 150);
    this.pieChart.title = 'A simple pie chart';
    this.pieChart.subtitle = 'A graph of all transactions';
    this.pieChart.unit = 'KES';
    this.pieChart.populate(this.data);

    this.lineChart = new LineChart(600, 500);
    this.lineChart.title = 'A sample line chart';
    this.lineChart.subtitle = 'Money spent this year';
    this.lineChart.populate(this.data);

    this.lineChart.line.color = randomColor();
    this.lineChart.line.width = 9;
  }

}


