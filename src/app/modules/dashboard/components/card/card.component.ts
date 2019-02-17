import {Component, Input, OnInit} from '@angular/core';
import {ECardType, IReportCard, IReportCardData} from '../../models/ReportCard.model';
import {Observable} from 'rxjs';
import {TransactionsSelectors} from '../../store';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import {ITransaction, TransactionUtils} from '../../models/Transaction.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: IReportCard;
  transactions$: Observable<ITransaction[]>;
  data: IReportCardData;
  today: Date = new Date();

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
        if (this.config.type !== ECardType.NetWorth) {
          if (this.config.type === ECardType.Income) {
            data = TransactionUtils.getIncome(data);
          } else if (this.config.type === ECardType.Expense) {
            data = TransactionUtils.getExpenses(data);
          }
          data = TransactionUtils.getThisMonthTransactions(data);
        }

        this.data.value = TransactionUtils.sumOf(data);
      });
    this.transactions$.subscribe(
      data => {

        if (this.config.type === ECardType.Income) {
          data = TransactionUtils.getIncome(data);
        } else if (this.config.type === ECardType.Expense) {
          data = TransactionUtils.getExpenses(data);
        }

        if (this.config.type !== ECardType.NetWorth) {
          data = TransactionUtils.getLastMonthTransactions(data);
        } else {
          data = data.filter(transaction => {
            const created_at_date = new Date(transaction.created_at);
            return created_at_date < TransactionUtils.getFirstOfThisMonth();
          });
        }

        this.data.previous = TransactionUtils.sumOf(data);
      });
  }

}
