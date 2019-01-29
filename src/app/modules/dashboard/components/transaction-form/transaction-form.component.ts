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
  tag = '';
  suggestedTags = [];
  tags = [
    {
      'name': 'UBER',
      'hovered': false,
      'selected': false
    },
    {
      'name': 'FOOD',
      'hovered': false,
      'selected': false
    },
    {
      'name': 'GIRL',
      'hovered': false,
      'selected': false
    },
    {
      'name': 'MICROSOFT',
      'hovered': false,
      'selected': false
    },
    {
      'name': 'FARE',
      'hovered': false,
      'selected': false
    }
  ];
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

  toUpperCase() {
    this.suggestedTags = [];
    this.tag = this.tag.toUpperCase();
    for (const tag of this.tags) {
      if (tag.name.indexOf(this.tag) > -1 && this.tag !== '') {
        this.suggestedTags.push(tag);
      }
    }
  }

}
