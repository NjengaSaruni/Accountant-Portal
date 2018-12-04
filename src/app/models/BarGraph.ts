export class Bar {
  height: number;
  width: number;

  constructor(height?: number, width?: number) {
    this.height = height;
    this.width = width;
  }
}

export class BarGraph {
  private numberOfBars: number;
  bars: Bar[];

  get numberOfBars(): number {
    return this.bars.length;
  }
}

