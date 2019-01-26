import { Component, OnInit } from '@angular/core';
import {ITag, ITranscation} from '../../models/Transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: ITranscation[] = [];
  constructor() { }

  ngOnInit() {
    this.transactions.push(
      <ITranscation>{
        amount: -1000,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Going to work'
      }
    );
    this.transactions.push(
      <ITranscation>{
        amount: -2000,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Going to back from'
      }
    );
    this.transactions.push(
      <ITranscation>{
        amount: 10000,
        tag: <ITag> {
          name: 'SAVINGS'
        },
        description: 'Redeemed savings'
      }
    );
  }
}
