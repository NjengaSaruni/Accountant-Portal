import {Component, HostListener, OnInit} from '@angular/core';
import {SlideInOutAnimation} from '../../../../animations/slideDown.animation';
import {SlideInOutAnimationSlow} from '../../../../animations/slideInOutSlow.animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromTransactionsActions from '../../store/actions';
import {RootState} from '../../../../core/store/state';
import {ITransaction} from '../../models/Transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: [SlideInOutAnimation, SlideInOutAnimationSlow]
})
export class TransactionFormComponent implements OnInit {
  transactionBoxAnimationState  = 'out';
  suggestionsAnimationState  = 'out';
  tag = '';
  today = new Date();
  typeOptions = [{
      id: 1,
      type: 'Expense',
      selected: true
    }, {
      id: 2,
      type: 'Income',
      selected: false
    }, {
      id: 3,
      type: 'Refund',
      selected: false
    }
  ];

  transactionForm: FormGroup;
  errors: boolean;

  constructor(private formBuilder: FormBuilder,
              private store$: Store<RootState>) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      description: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        '1',
        [
          Validators.required
        ]
      ),
      amount: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      date: new FormControl(
        new Date(),
        [
          Validators.required
        ]
      ),
      tag: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
    });
  }

  // Listen for escape events to hide trasaction box
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.toggleTransactionBox(false);
  }

  toggleTransactionBox(show: boolean): void {
    this.transactionBoxAnimationState = show ? 'in' : 'out';
  }

  onClickOutside(event: any): void {
    this.toggleTransactionBox(!event.value);
  }

  selectOption = (event: any, option: any) => console.log(this.transactionForm.getRawValue());


  f = () => this.transactionForm.controls;

  saveTransaction() {
    let amount = Math.abs(this.f().amount.value);

    // Expenses are negative value transactions
    amount = parseInt(this.f().type.value, 10) === 1 ?  -amount : amount;

    // @ts-ignore
    const transactionPayload = <ITransaction>{
      'tag': this.f().tag.value,
      'description': this.f().description.value,
      'amount': amount,
      'created_at': moment(this.f().date.value).format('YYYY-MM-DD HH:mm')
    };
    this.store$.dispatch(new fromTransactionsActions.AddTransaction(transactionPayload));
  }

  validateAmount() {
    const re = /^[0-9.]+$/;
    if (!this.f().amount.value.match(re)) {
      this.errors = true;
    }
  }

}
