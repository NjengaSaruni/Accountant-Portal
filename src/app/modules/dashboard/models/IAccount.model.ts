import {IAbstractBase} from '../../shared/models/AbstractBase.model';

export interface IAccount extends IAbstractBase {
  name: string;
  balance: number;
  description: string;
}
