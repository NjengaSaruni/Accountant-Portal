export class LineChartPoint {
  get title(): string {
    return this._title;
  }

  set title(value: string) {
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
  private _title: string;
  private _value: number;

  constructor(value: number) {
    this.value = value;
  }
}
