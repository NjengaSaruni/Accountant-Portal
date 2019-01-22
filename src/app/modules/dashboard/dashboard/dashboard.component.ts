import { Component, OnInit } from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {getMockBarchart, getMockLinechart, getMockPiechart, randomColor} from '../../shared/utils/randomInt';
import {IReportCard} from '../models/ReportCard.model';

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
  cards: IReportCard[] = [];
  constructor() { }

  async ngOnInit() {
    this.barCharts.push(getMockBarchart());
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    this.lineChart = getMockLinechart();

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Income',
          color: '#FAFAFA'
        },
        background: {
          color: 'green'
        }
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Expense',
          color: '#FAFAFA'
        },
        background: {
          color: 'orange'
        }
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Saved',
          color: '#FAFAFA'
        },
        background: {
          color: 'blue'
        }
      }
    );  this.cards.push(
      <IReportCard> {
        title: {
          name: 'Avg. Monthly Expense',
          color: '#FAFAFA'
        },
        background: {
          color: randomColor()
        }
      }
    );
  }
}
