import { Injectable } from '@angular/core';
import {Color} from '../models/Color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  get colors(): Map<string, Color> {
    return this._colors;
  }

  set colors(value: Map<string, Color>) {
    this._colors = value;
  }
  constructor() {
    this.colors['grey'] = '#DADADA';
  }
  private _colors =  new Map<string, Color>();
}
