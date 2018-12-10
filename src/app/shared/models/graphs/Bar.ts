import {randomInt} from '../../utils/randomInt';

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
