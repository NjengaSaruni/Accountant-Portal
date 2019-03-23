import {TransactionEffects} from './transaction.effects';
import {LimitEffects} from './limits.effects';

export const dashboardEffects: any[] = [TransactionEffects, LimitEffects];

export * from './transaction.effects';
export * from './limits.effects';
