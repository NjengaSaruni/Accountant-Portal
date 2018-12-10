import { Injectable } from '@angular/core';
import {Color} from '../models/Color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  get colors(): Map<string, string> {
    return this._colors;
  }

  set colors(value: Map<string, string>) {
    this._colors = value;
  }
  constructor() {
    this.colors['grey'] = '#DADADA';
  }
  private _colors =  new Map<string, string>();

  get(name: string) {
    if (this.colors.has(name)) {
      return this.colors[name];
    }
  }
}
