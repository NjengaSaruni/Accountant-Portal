import {randomInt} from '../../../utils/randomInt';

export class Pie {
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }
  private _angle: number;
  private _title: string;
  private _color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;

  constructor(angle: number) {
    this.angle = angle;
  }
}
