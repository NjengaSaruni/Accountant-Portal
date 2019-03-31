import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss']
})
export class BudgetsFormComponent implements OnInit {
  budgetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.budgetForm = this.formBuilder.group({
      tag: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      amount: new FormControl(
        0,
        [
          Validators.required
        ]
      ),
    });
  }



}
