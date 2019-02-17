import {Component, Input, OnInit} from '@angular/core';
import {ECardType, IReportCard, IReportCardData} from '../../models/ReportCard.model';
import {Observable} from 'rxjs';
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

    this.data = <IReportCardData>{
      unit: 'KES'
    };
    this.transactions$.subscribe(
      data => {
        if (this.config.type === ECardType.Income) {
          data = data.filter(transaction => transaction.amount > 0);
        } else if (this.config.type === ECardType.Expense) {
          data = data.filter(transaction => transaction.amount <= 0);
        }
        this.data.value = data.map(transaction => transaction.amount)
          .reduce((acc, currentValue) => {
            return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
          }, 0)
          .valueOf();
      });
  }

}
