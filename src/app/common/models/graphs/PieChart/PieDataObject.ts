import {randomColor} from '../../../utils/randomInt';

export class PieDataObject {
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
  private _name: string;
  private _value: number;
  private _color: string;


  constructor(name: string, value: number, color: string = randomColor()) {
    this.name = name;
    this.value = value;
    this.color = color;
  }
}
