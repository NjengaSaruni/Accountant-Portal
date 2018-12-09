import {randomInt} from '../utils/randomInt';

export class Bar {
  height: number;
  currentHeight = 0;
  width: number;
  color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;

  constructor(height?: number, width?: number) {
    this.height = height;
    this.width = width;
  }
}

export class BarGraph {
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
  get bars(): Bar[] {
    return this._bars;
  }

  set bars(value: Bar[]) {
    this._bars = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  private _title: string;
  private _bars: Bar[];
  private _width = 0;
  get numberOfBars(): number {
    return this._bars.length;
  }

  add(bar: Bar) {
    this._bars.push(bar);
  }
}

