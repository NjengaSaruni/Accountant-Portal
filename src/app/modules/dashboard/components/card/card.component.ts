import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IReportCard, IReportCardData} from '../../models/ReportCard.model';
import {Observable, of} from 'rxjs';
import {TransactionsSelectors} from '../../store';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import {ITransaction} from '../../models/Transaction.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: IReportCard;
  transactions$: Observable<ITransaction[]>;
  data: IReportCardData;

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.transactions$ = this.store$.select(
      TransactionsSelectors.selectTransactions
    );

    this.data = <IReportCardData>{};
    this.transactions$.subscribe(
      data => {
        this.data.value = data.filter(transaction => transaction.amount > 0)
          .map(transaction => transaction.amount)
          .reduce((acc, currentValue) => {
            return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
          })
          .valueOf();
      });
  }

}
