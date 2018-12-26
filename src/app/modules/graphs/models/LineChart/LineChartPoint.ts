export class LineChartPoint {
  get title(): number {
    return this._title;
  }

  set title(value: number) {
    this._title = value;
  }
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }
  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
  private _x: number;
  private _y: number;
  private _title: number;
  private _value: number;

  constructor(value: number) {
    this.value = value;
  }
}
