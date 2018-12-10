import {randomInt} from '../utils/randomInt';

export class Bar {
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
  get currentHeight(): number {
    return this._currentHeight;
  }

  set currentHeight(value: number) {
    this._currentHeight = value;
  }
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
  private _height: number;
  private _currentHeight = 0;
  private _width: number;
  private _title: string;
  private _color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;

  constructor(height?: number, width?: number) {
    this._height = height;
    this._width = width;
  }
}

export class BarGraph {
  get pattern(): number[] {
    return this._pattern;
  }

  set pattern(value: number[]) {
    this._pattern = value;
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
  private _bars: Bar[];
  private _width = 50;
  private _subtitle: string;
  private _description: string;
  private _height = 0;
  private _velocity = 1;
  private _pattern = [1, 1];
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

