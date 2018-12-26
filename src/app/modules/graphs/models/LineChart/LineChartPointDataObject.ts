export class LineChartPointDataObject {
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
  private _title: string;
  private _value: number;

  constructor (title: string, value: number) {
    this._title = title;
    this._value = value;
  }
}
