import { Component, OnInit } from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {getMockBarchart, getMockLinechart, getMockPiechart, randomColor} from '../../shared/utils/randomInt';
import {IReportCard} from '../models/ReportCard.model';
import {WindowRefService} from '../../shared/services/window-ref.service';

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
  constructor(private winRef: WindowRefService) { }

  async ngOnInit() {
    this.barCharts.push(getMockBarchart((this.winRef.nativeWindow.innerWidth - 300) / 2));
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    console.log(this.winRef.nativeWindow);
    this.lineChart = getMockLinechart((this.winRef.nativeWindow.innerWidth - 200) / 2);

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Income',
          color: '#6EC4DB'
        },
        background: {
          // color: '#6EC4DB'
        },
        data: {
          value: 1000,
          unit: 'KES',
          previous: 2000
        }
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Expense',
          color: '#FA7C92'
        },
        background: {
          // color: '#FA7C92'
        },
        data: {
          value: -6000,
          unit: 'KES',
          previous: -4800
        }
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Saved',
          color: '#A239CA'
        },
        background: {
          // color: '#FFF7C0'
        },
        data: {
          value: this.cards[0].data.value + this.cards[1].data.value,
          unit: 'KES',
          previous: this.cards[0].data.previous + this.cards[1].data.previous
        }
      }
      );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'NET WORTH',
          color: '#66AB86'
        },
        background: {
          // color: '#66AB86'
        },
        data: {
          value: 100000,
          unit: 'KES',
          previous: 900,
        }
      }
    );
  }
}
