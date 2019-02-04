import {Component, HostListener, OnInit} from '@angular/core';
import {SlideInOutAnimation} from '../../../../animations/slideDown.animation';
import {SlideInOutAnimationSlow} from '../../../../animations/slideInOutSlow.animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    },
    {
      'name': 'SHOPPING',
      'hovered': false,
      'selected': false
    }
  ];
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      description: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      amount: new FormControl(
        '',
        [
          Validators.required
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

  toUpperCase() {
    this.suggestedTags = [];
    this.suggestionsAnimationState = 'out';

    for (const tag of this.tags) {
      if (tag.name.indexOf(    this.transactionForm.get('tag').value) > -1 &&  this.transactionForm.get('tag').value !== '') {
        this.suggestedTags.push(tag);
      }
      this.suggestionsAnimationState = 'in';
    }
  }

  selectOption(event: any, option: any) {
    console.log(this.transactionForm.getRawValue());
  }

}
