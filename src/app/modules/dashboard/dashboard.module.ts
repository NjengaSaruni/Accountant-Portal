import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from '../charts/charts.module';
import {CardComponent} from './components/card/card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {TransactionFormComponent} from './components/transaction-form/transaction-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthHttpInterceptor} from '../auth/services/auth.httpinterceptor';
import { TargetsComponent } from './components/targets/targets.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { BudgetsFormComponent } from './components/budgets-form/budgets-form.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent, CardComponent, TransactionsComponent, TransactionFormComponent, TargetsComponent, BudgetsComponent, BudgetsFormComponent ],
  imports: [
    // External
    CommonModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,

    // Internal
    DashboardRoutingModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ]
})
export class DashboardModule { }

