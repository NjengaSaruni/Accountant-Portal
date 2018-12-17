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
  get sliceAngle(): number {
    return this._sliceAngle;
  }

  set sliceAngle(value: number) {
    this._sliceAngle = value;
  }
  private _sliceAngle: number;
  private _middleAngle: number;
  private _title: string;
  private _color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;

  constructor(angle: number) {
    this.sliceAngle = angle;
  }
}
