import {Component, OnInit} from '@angular/core';
import {BarChart} from '../../graphs/models/BarChart/BarChart';
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
  barCharts: BarChart[] = [];
  pieChart: PieChart;
  lineChart: LineChart;
  data: DataObject[];

  constructor() { }

  async ngOnInit() {
    this.data = [
      new DataObject('Jan', randomInt(1, 4000), randomColor()),
      new DataObject('Feb', randomInt(1, 4000), randomColor()),
      new DataObject('Mar', randomInt(1, 4000), randomColor()),
      new DataObject('Apr', randomInt(1, 1000), randomColor()),
      new DataObject('May', randomInt(1, 1000), randomColor()),
      new DataObject('Jun', randomInt(1, 4000), randomColor()),
      new DataObject('Jul', randomInt(1, 4000), randomColor()),
      new DataObject('Aug', randomInt(1, 10000), randomColor()),
      new DataObject('Sep', randomInt(1, 4000), randomColor()),
      new DataObject('Oct', randomInt(1, 4000), randomColor()),
      new DataObject('Nov', randomInt(1, 4000), randomColor()),
      new DataObject('Dec', randomInt(1, 4000), randomColor()),
    ];

    this.barCharts.push(new BarChart(800, 400));
    const barChart = this.barCharts[0];

    barChart.title = `Bar Graph A`;
    barChart.subtitle = `A graph of weekly expenditure in Kshs`;
    barChart.line.pattern = [15, 3, 3, 3];
    barChart.line.width = 0.3;
    barChart.line.color = '#1945ff';
    barChart.populate(this.data);

    this.barCharts.push(barChart);

    this.pieChart = new PieChart(100, 80);
    this.pieChart.title = 'A simple pie chart';
    this.pieChart.subtitle = 'A barChart of all transactions';
    this.pieChart.unit = 'KES';
    this.pieChart.populate(this.data);

    this.lineChart = new LineChart(600, 400);
    this.lineChart.title = 'A sample line chart';
    this.lineChart.subtitle = 'Money spent this year';
    // this.lineChart.max = 40000;
    this.lineChart.populate(this.data);


    this.lineChart.line.color = randomColor();
    this.lineChart.line.width = randomInt(2, 6);
  }

}


