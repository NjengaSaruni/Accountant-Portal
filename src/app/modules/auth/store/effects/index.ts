import {AuthEffects} from './auth.effects';
import {RegisterEffects} from './register.effects';

export const effects: any[] = [AuthEffects, RegisterEffects];

export * from './auth.effects';
export * from './register.effects';
