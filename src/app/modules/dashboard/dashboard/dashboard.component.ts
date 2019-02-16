import {Component, OnInit} from '@angular/core';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {getMockBarchart, getMockLinechart, getMockPiechart} from '../../shared/utils/randomInt';
import {IReportCard, IReportCardBackground, IReportCardData} from '../models/ReportCard.model';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {Title} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {RootState} from '../../../core/store/state';
import {Observable, of} from 'rxjs';
import {ITransaction} from '../models/Transaction.model';
import {TransactionsSelectors} from '../store';
import {reduce} from 'rxjs/operators';

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
  cards: Observable<IReportCard>[] = [];
  transactionBoxAnimationState = 'out';
  totalIncome$: Observable<number>;
  totalExpense$: Observable<number>;
  totalValue$: Observable<number>;

  constructor(private winRef: WindowRefService,
              private titleService: Title,
              private store$: Store<RootState>) {
    this.titleService.setTitle('iSave | Dashboard');
  }

  async ngOnInit() {
    this.barCharts.push(getMockBarchart((this.winRef.nativeWindow.innerWidth - 300) / 2));
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    this.lineChart = getMockLinechart((this.winRef.nativeWindow.innerWidth - 300) / 2);
    this.transactions$ = this.store$.select(
      TransactionsSelectors.selectTransactions
    );

    this.transactions$.subscribe(
      data => {
        this.totalExpense$ = of(data
          .filter(transaction => transaction.amount < 0)
          .map(transaction => transaction.amount)
          .reduce((acc, currentValue) => {
            return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
          }));

        this.totalIncome$ = of(data
          .filter(transaction => transaction.amount >= 0)
          .map(transaction => transaction.amount)
          .reduce((acc, currentValue) => {
            return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
          }));
      });

    this.cards.push(
      of(<IReportCard> {
        title: {
          name: 'Income',
          color: '#66AB86'
        },
        background: <IReportCardBackground>{
          color: '#6EC4DB'
        },
        data: <IReportCardData>{
          value: this.totalIncome$,
          unit: 'KES',
          previous: 2000
        }
      }
    ));

    this.cards.push(
      of(<IReportCard> {
        title: {
          name: 'Expense',
          color: '#FA7C92'
        },
        background: <IReportCardBackground> {
          color: '#FA7C92'
        },
        data: <IReportCardData>{
          value: this.totalExpense$,
          unit: 'KES',
          previous: -4800
        }
      }
    ));
    //
    // this.cards.push(
    //   <IReportCard> {
    //     title: {
    //       name: 'Saved',
    //       color: '#A239CA'
    //     },
    //     background: <IReportCardBackground>{
    //       color: '#FFF7C0'
    //     },
    //     data: {
    //       value$: this.cards[0].data.value + this.cards[1].data.value,
    //       unit: 'KES',
    //       previous: this.cards[0].data.previous + this.cards[1].data.previous
    //     }
    //   }
    //   );

    // this.cards.push(
    //   <IReportCard> {
    //     title: {
    //       name: 'NET WORTH',
    //       color: '#6EC4DB'
    //     },
    //     background: {
    //       // color: '#66AB86'
    //     },
    //     data: {
    //       value: 100000,
    //       unit: 'KES',
    //       previous: 900,
    //     }
    //   }
    // );
  }
}
