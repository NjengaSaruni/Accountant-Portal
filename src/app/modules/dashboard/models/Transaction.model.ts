import {IAbstractBase} from '../../shared/models/AbstractBase.model';
import * as moment from 'moment';

export interface IAccount extends IAbstractBase {
  name: string;
  balance: number;
  description: string;
}
export interface ITag extends IAbstractBase {
  name: string;
  description: string;
  color: string;
}
export interface ITransaction extends IAbstractBase {
  amount: number;
  description: string;
  tag: ITag;
  account: IAccount;
}

export class TransactionUtils {
  /*
    Grouped static utility methods for transactions
    for convenience
  */

  static getThisMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction => moment(transaction.created_at) >= moment().startOf('month'));

  static getLastMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction =>  {
      return moment(transaction.created_at) <= moment()
          .subtract(1, 'months')
          .endOf('month')
        && moment(transaction.created_at) >= moment()
        .subtract(1, 'months')
        .startOf('month');
    });

  static getExpenses = (transactions: ITransaction[]) =>
    transactions.filter(transaction => transaction.amount < 0);

  static getIncome = (transactions: ITransaction[]) =>
    transactions.filter(transaction => transaction.amount >= 0);

  static sumOf = (transactions: ITransaction[]) =>
    transactions.map(transaction => {
      return transaction.amount;
    })
    .reduce((acc, currentValue) => {
      return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
    }, 0).valueOf();
}
