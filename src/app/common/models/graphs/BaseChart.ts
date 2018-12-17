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

}
