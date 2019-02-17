import {IAbstractBase} from '../../shared/models/AbstractBase.model';

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
  public static today = () => new Date();

  static getThisMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction => new Date(transaction.created_at) >= TransactionUtils.getFirstOfThisMonth());

  static getLastMonthTransactions = (transactions: ITransaction[]) =>
    transactions.filter(transaction =>  {
      const created_at_date = TransactionUtils.convertToDate(transaction.created_at);
      return created_at_date >= TransactionUtils.getFirstOfLastMonth() && created_at_date < TransactionUtils.getFirstOfThisMonth();
    });

  static getExpenses = (transactions: ITransaction[]) =>
    transactions.filter(transaction => transaction.amount < 0);

  static getIncome = (transactions: ITransaction[]) =>
    transactions.filter(transaction => transaction.amount >= 0);

  static getFirstOfThisMonth = () => new Date(
    TransactionUtils.today().getFullYear(),
    TransactionUtils.today().getMonth(),
    1
  );

  static getFirstOfLastMonth = () => new Date(
    TransactionUtils.today().getMonth() === 1 ? TransactionUtils.today().getFullYear() - 1 : TransactionUtils.today().getFullYear(),
    TransactionUtils.today().getMonth() === 1 ? 12 : TransactionUtils.today().getMonth() - 1,
    1
  );

  static convertToDate = (date: Date) => new Date(date);

  static sumOf = (transactions: ITransaction[]) =>
    transactions.map(transaction => {
      return transaction.amount;
    })
    .reduce((acc, currentValue) => {
      return parseFloat(acc.toString()) + parseFloat(currentValue.toString());
    }, 0).valueOf();
}
