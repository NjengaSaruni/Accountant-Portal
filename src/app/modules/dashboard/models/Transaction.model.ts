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
  tag: ITag;
  account: IAccount;
}
