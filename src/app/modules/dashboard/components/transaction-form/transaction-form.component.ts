import { Component, OnInit } from '@angular/core';
import {SlideInOutAnimation} from '../../../../animations/slideDown.animation';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: [SlideInOutAnimation]
})
export class TransactionFormComponent implements OnInit {
  transactionBoxAnimationState  = 'out';
  constructor() { }

  ngOnInit() {
  }

  toggleTransactionBox(value: boolean) {
    this.transactionBoxAnimationState = value ? 'in' : 'out';
  }

  insideForm(value: boolean) {
    console.log(value);
  }

  onClickOutside(event: any) {
    this.toggleTransactionBox(!event.value);
  }

}
