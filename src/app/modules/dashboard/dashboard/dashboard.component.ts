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
import * as colors from '../../../../assets/colors'
import * as _ from 'lodash';
import {ITag} from '../models/Tag.model';
import {ILimit} from '../models/Limit.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;
  transactionsLoaded$: Observable<boolean>;
  limits$: Observable<ILimit[]>;

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
    this.limits$ = this.store$.select(
      fromStore.selectLimits
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
          color: colors.PRIMARY
        },
        background: <IReportCardBackground>{
          color: colors.PRIMARY
        },
        type: ECardType.Income
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Expense',
          color: colors.PRIMARY
        },
        background: <IReportCardBackground> {
          color: colors.SECONDARY
        },
        type: ECardType.Expense
      }
    );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'Saved',
          color: colors.PRIMARY
        },
        background: <IReportCardBackground>{
          color: colors.PRIMARY
        },
        type: ECardType.Saved

      }
      );

    this.cards.push(
      <IReportCard> {
        title: {
          name: 'NET WORTH',
          color: colors.PRIMARY
        },
        type: ECardType.NetWorth,
        background: {
          color: colors.PRIMARY
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
