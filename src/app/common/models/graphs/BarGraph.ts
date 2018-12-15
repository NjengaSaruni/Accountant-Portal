import {Bar} from './Bar';
import {BarGraphLine} from './BarGraphLine';

export class BarGraph {
  get line(): BarGraphLine {
    return this._line;
  }

  set line(value: BarGraphLine) {
    this._line = value;
  }
  get backgroundColor(): string {
    return this._backgroundColor;
  }

  set backgroundColor(value: string) {
    this._backgroundColor = value;
  }

  get velocity(): number {
    return this._velocity;
  }

  set velocity(value: number) {
    this._velocity = value;
  }
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  get subtitle(): string {
    return this._subtitle;
  }

  set subtitle(value: string) {
    this._subtitle = value;
  }
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
  private _bars: Bar[] = [];
  private _width = 50;
  private _subtitle: string;
  private _description: string;
  private _height = 0;
  private _velocity = 1;
  private _line = new BarGraphLine();
  private _backgroundColor = '#FFFFFF';
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

