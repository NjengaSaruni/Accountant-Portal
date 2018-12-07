export class Bar {
  height: number;
  width: number;

  constructor(height?: number, width?: number) {
    this.height = height;
    this.width = width;
  }
}

export class BarGraph {
  bars: Bar[];
  get numberOfBars(): number {
    return this.bars.length;
  }

  add(bar: Bar) {
    this.bars.push(bar);
  }
}
