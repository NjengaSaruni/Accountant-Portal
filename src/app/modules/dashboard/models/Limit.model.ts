import {IAbstractBase} from '../../shared/models/AbstractBase.model';
import {ITag} from './Tag.model';
import {IAccount} from './IAccount.model';

export interface ILimit extends IAbstractBase {
  tag: ITag;
  amount: number;
  start_date: Date;
  end_date: Date;
  account: IAccount;
}
