import {Component, OnInit} from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {getMockBarchart, getMockLinechart, getMockPiechart} from '../../shared/utils/randomInt';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {LineChart} from '../../charts/models/LineChart/LineChart';

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
    this.barCharts.push(getMockBarchart());
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    this.lineChart = getMockLinechart();
  }

}


