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
import {Observable, pipe} from 'rxjs';
import {ITransaction} from '../models/Transaction.model';
import * as fromActions from '../store/actions/transaction.actions'
import * as fromStore from '../store'

import * as _ from 'lodash';
import {ITag} from '../models/Tag.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;
  transactionsLoaded$: Observable<boolean>;

  barCharts: BarChart[] = [];
  pieChart: PieChart;
  lineChart: LineChart;
  data: DataObject[];
  cards: IReportCard[] = [];
  transactionBoxAnimationState = 'out';
  dataObjects: DataObject[] = [];

  tags: Set<ITag> = new Set();
  showSide = true;
  showTagOptions: boolean;
  constructor(private winRef: WindowRefService,
              private titleService: Title,
              private store$: Store<RootState>) {
    this.titleService.setTitle('iSave | Dashboard');
  }

  ngOnInit() {
    this.barCharts.push(getMockBarchart((this.winRef.nativeWindow.innerWidth - 300) / 2));
    this.barCharts.push(getMockBarchart());
    this.pieChart = getMockPiechart();
    this.lineChart = getMockLinechart((this.winRef.nativeWindow.innerWidth - 300) / 2);

    this.store$.dispatch(new fromActions.LoadTransactions());

    this.transactions$ = this.store$.select(
      fromStore.selectTransactions
    );

    this.transactionsLoaded$ = this.store$.select(
      fromStore.selectTransactionsLoaded
    );

    this.transactions$.subscribe(
      transactions => {
        const tags: ITag[] = transactions.map(transaction => transaction.tag);
        this.tags = new Set((_.uniqBy(tags, 'id')));
      }
    );

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

  onClickOutside(event: any): void {
    if (event.value) {
      this.showTagOptions = false;
    }
  }
}
