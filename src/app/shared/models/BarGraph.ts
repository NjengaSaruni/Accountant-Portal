import {randomInt} from '../utils/randomInt';

export class Bar {
  height: number;
  currentHeight = 0;
  width: number;
  color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;

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

