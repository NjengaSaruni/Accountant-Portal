import {IAbstractBase} from '../../shared/models/AbstractBase.model';

export interface ITag extends IAbstractBase {
  name: string;
  description: string;
  color: string;
}
