import {IAbstractBase} from '../../shared/models/AbstractBase.model';
import {convertToDate, FIRST_OF_CURRENT_MONTH, FIRST_OF_PREVIOUS_MONTH} from '../../shared/utils/timeUtils';

export interface IAccount extends IAbstractBase {
  name: string;
  balance: number;
  description: string;
}
export interface ITag extends IAbstractBase {
  name: string;
  description: string;
}
export interface ITransaction extends IAbstractBase {
  amount: number;
  description: string;
  tag: ITag | string;
  account: IAccount;
}

export class TransactionUtils {
  /*
    Grouped static utility methods for transactions
    for convenience
  */

  static getThisMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction => new Date(transaction.created_at) >= FIRST_OF_CURRENT_MONTH);

  static getLastMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction =>  {
      const created_at_date = convertToDate(transaction.created_at);
      return created_at_date >= FIRST_OF_PREVIOUS_MONTH && created_at_date < FIRST_OF_CURRENT_MONTH;
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
