import { Component, OnInit } from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {getMockBarchart, getMockLinechart, getMockPiechart} from '../../shared/utils/randomInt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
