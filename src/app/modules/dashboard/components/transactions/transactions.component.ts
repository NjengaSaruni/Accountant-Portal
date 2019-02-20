import {Component, OnInit} from '@angular/core';
import {ITag, ITransaction} from '../../models/Transaction.model';
import {ModalService} from '../../../shared/components/modal/modal.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import {TransactionsSelectors} from '../../store';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {ShortSlideInOutAnimation} from '../../../../animations/shortSlideDown.animation';
import * as fromTransactionsActions from '../../store/actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [ShortSlideInOutAnimation]
})
export class TransactionsComponent implements OnInit {
  transactions: ITransaction[] = [];
  transactions$: Observable<ITransaction[]>;
  transactionsLoading$: Observable<boolean>;
  transactionAnimationState  = 'out';

  lists = [
    {
      name: 'New',
      selected: true
    },
    {
      name: 'Deleted',
      selected: false
    }
  ];
  constructor(private modalService: ModalService,
              private loaderService: LoaderService,
              private store$: Store<RootState>) { }

  ngOnInit() {
    this.transactions.push(
      <ITransaction>{
        amount: -1000,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Going to work'
      }
    );
    this.transactions.push(
      <ITransaction>{
        amount: -2000,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Going to back from'
      }
    );
    this.transactions.push(
      <ITransaction>{
        amount: 1000000,
        tag: <ITag> {
          name: 'SAVINGS'
        },
        description: 'Redeemed savings'
      }
    );
    this.transactions.push(
      <ITransaction>{
        created_at: new Date(),
        amount: -230,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Travelled to see my brother in South B.'
      }
    );
    this.transactions.push(
      <ITransaction>{
        created_at: new Date('2019-10-12'),
        amount: -2800,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Travelled to see my brother in South B.'
      }
    );

    this.transactions$ = this.store$.select(
      TransactionsSelectors.selectTransactions
    );

    this.transactionsLoading$ = this.store$.select(
      TransactionsSelectors.selectTransactionsLoaded
    );
     this.store$.select(
      TransactionsSelectors.selectTransactionsLoaded
    ).subscribe(
      data => {
        data ? this.loaderService.hide() : this.loaderService.show();
      }
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  selectList(i: number) {
    this.lists[i].selected = true;
    this.lists[Math.abs(i - 1)].selected = false;
  }

  deleteTransaction(transaction: ITransaction) {
    const transactionPayload = transaction.id;
    this.store$.dispatch(new fromTransactionsActions.DeleteTransaction(transactionPayload));
  }

}
