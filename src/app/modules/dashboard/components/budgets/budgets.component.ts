import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ILimit} from '../../models/Limit.model';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import * as fromStore from '../../store';
import * as moment from 'moment';
import * as _ from 'lodash';
import {DataObject} from '../../../charts/models/BaseChart/DataObject';
import {ITransaction, TransactionUtils} from '../../models/Transaction.model';
import {invertColor} from '../../../shared/utils/colors.utils';
import {MatDialog} from '@angular/material';
import {BudgetsFormComponent} from '../budgets-form/budgets-form.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  limits$: Observable<ILimit[]>;
  limits$$: Subscription;
  transactions$: Observable<ITransaction[]>;
  transactions$$: Subscription;
  dataObjects: DataObject[] = [];


  constructor(
    public dialog: MatDialog,
    private store$: Store<RootState>) {}

  ngOnInit() {
    this.store$.dispatch(new fromStore.LoadLimits());

    this.transactions$ = this.store$.select(
      fromStore.selectTransactions
    );

    this.limits$ = this.store$.select(
      fromStore.selectLimits
    );

    this.transactions$.subscribe(
      transactions => {
        this.dataObjects = [];

        transactions = transactions.filter(
          transaction => moment(transaction.created_at) >= moment().startOf('month')
            && transaction.amount < 0
        );

        const grouped = _.groupBy(transactions, 'tag.name');
        for (const tag in grouped) {
          this.dataObjects.push(new DataObject(
            tag,
            Math.abs(TransactionUtils.sumOf(grouped[tag])),
            grouped[tag][0].tag.color
          ))
        }
      }
    );
  }

  invertColor(color, bw) {
    return invertColor(color, bw);
  }

  getDataObject(limit: ILimit): DataObject {
    return this.dataObjects.find(dataObject => dataObject.title === limit.tag.name)
  }

  getPercentage(limit: ILimit, dataObject: DataObject): number {
    const value: number = (dataObject.value / limit.amount) * 100;
    return value < 100 ? value : 100;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BudgetsFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
