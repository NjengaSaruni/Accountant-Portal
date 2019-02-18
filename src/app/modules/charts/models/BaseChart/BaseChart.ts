import {DataObject} from './DataObject';

export class BaseChart {
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
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
  get backgroundColor(): string {
    return this._backgroundColor;
  }

  set backgroundColor(value: string) {
    this._backgroundColor = value;
  }

  private _backgroundColor = '#FFFFFF';
  private _height = 0;
  private _width = 50;
  private _title: string;
  private _subtitle: string;
  private _description: string;

  public static getMinPoint(data: DataObject[]): number {
    return data.reduce((min, p) => p.value < min ? p.value : min, data[0].value);
  }
  public static getMaxPoint(data: DataObject[]): number {
    const m = data.reduce((max, p) => p.value > max ? p.value : max, data[0].value);
    return BaseChart.getOrder(m);
  }

  public static getOrder(m: number): number {
    if (m <= 1) {
      return 1;
    }
    if (m <= 2) {
      return 2;
    }
    if (m <= 5) {
      return 5;
    }
    return this.getOrder(m / 10) * 10;
  }

}
