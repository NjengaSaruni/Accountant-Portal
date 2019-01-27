import { Component, OnInit } from '@angular/core';
import {ITag, ITranscation} from '../../models/Transaction.model';
import {ModalService} from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: ITranscation[] = [];
  constructor(private modalService: ModalService) { }

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
        amount: 1000000,
        tag: <ITag> {
          name: 'SAVINGS'
        },
        description: 'Redeemed savings'
      }
    );
    this.transactions.push(
      <ITranscation>{
        created_at: new Date(),
        amount: -230,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Travelled to see my brother in South B.'
      }
    );
    this.transactions.push(
      <ITranscation>{
        created_at: new Date('2019-10-12'),
        amount: -2800,
        tag: <ITag> {
          name: 'UBER'
        },
        description: 'Travelled to see my brother in South B.'
      }
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
