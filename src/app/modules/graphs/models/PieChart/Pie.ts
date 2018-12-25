import {randomInt} from '../../../../common/utils/randomInt';

export class Pie {
  get percentage(): number {
    return this._percentage;
  }

  set percentage(value: number) {
    this._percentage = value;
  }
  get rendered_angle(): number {
    return this._rendered_angle;
  }

  set rendered_angle(value: number) {
    this._rendered_angle = value;
  }
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
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
  private _rendered_angle = 0;
  private _title: string;
  private _color = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;
  private _value: number;
  private _percentage: number;

  constructor(value: number) {
    this.value = value;
  }
}
