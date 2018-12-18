import {Bar} from './Bar';
import {BarGraphLine} from './BarGraphLine';
import {BaseChart} from '../BaseChart';

export class BarGraph extends BaseChart {
  get line(): BarGraphLine {
    return this._line;
  }

  set line(value: BarGraphLine) {
    this._line = value;
  }

  get velocity(): number {
    return this._velocity;
  }

  set velocity(value: number) {
    this._velocity = value;
  }

  get bars(): Bar[] {
    return this._bars;
  }

  set bars(value: Bar[]) {
    this._bars = value;
  }

  private _bars: Bar[] = [];

  private _velocity = 1;
  private _line = new BarGraphLine();

  get size(): number {
    return this._bars.length;
  }

  add(bar: Bar) {
    this._bars.push(bar);
    if (bar.height + 30 > this.height) {
      this.height = bar.height + 30;
    }

    this.width += bar.width;
    this.velocity = this.height / 50;
  }

  get(i: number): Bar {
    return this.bars[i];
  }
}

