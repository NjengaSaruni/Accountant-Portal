export class LineChartLine {
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  private _color = '#000';
  private _width = 5;
}
