export class BarGraphLine {
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get pattern(): number[] {
    return this._pattern;
  }

  set pattern(value: number[]) {
    this._pattern = value;
  }
  private _pattern = [1, 1];
  private _width = 1;
  private _color = '#000000';
}
