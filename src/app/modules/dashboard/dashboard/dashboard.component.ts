import {Component, OnInit} from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {getMockBarchart, getMockLinechart, getMockPiechart} from '../../shared/utils/randomInt';
import {ECardType, IReportCard, IReportCardBackground} from '../models/ReportCard.model';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {Title} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {RootState} from '../../../core/store/state';
import {Observable} from 'rxjs';
import {ITransaction} from '../models/Transaction.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;

  barCharts: BarChart[] = [];
  pieChart: PieChart;
  lineChart: LineChart;
  data: DataObject[];
  cards: IReportCard[] = [];
  transactionBoxAnimationState = 'out';

  constructor(private winRef: WindowRefService,
              private titleService: Title) {
    this.titleService.setTitle('iSave | Dashboard');
  }

  async ngOnInit() {
    this.barCharts.push(getMockBarchart((this.winRef.nativeWindow.innerWidth - 300) / 2));
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    this.lineChart = getMockLinechart((this.winRef.nativeWindow.innerWidth - 300) / 2);

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Income',
          color: '#66AB86'
        },
        background: <IReportCardBackground>{
          color: '#6EC4DB'
        },
        type: ECardType.Income
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Expense',
          color: '#FA7C92'
        },
        background: <IReportCardBackground> {
          color: '#FA7C92'
        },
        type: ECardType.Expense
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Saved',
          color: '#1c5155'
        },
        background: <IReportCardBackground>{
          color: '#FFF7C0'
        },
        type: ECardType.Saved

      }
      );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'NET WORTH',
          color: '#6EC4DB'
        },
        type: ECardType.NetWorth,
        background: {
          // color: '#66AB86'
        }
      }
    );
  }
}
