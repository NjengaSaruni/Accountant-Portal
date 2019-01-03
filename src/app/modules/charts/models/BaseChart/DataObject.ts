import {randomColor} from '../../../../common/utils/randomInt';

export class DataObject {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
  private _title: string;
  private _value: number;
  private _color: string;
  private _id: string;


  /**
   * Represents a data object to be used as a Pie in a PieChart
   * @param name - The title for the Pie
   * @param value - The absolute value of the data object
   * @param color - The desired color of the Pie (A random RGBA color will be used if this is not supplied)
   */
  constructor(name: string, value: number, color: string = randomColor()) {
    this.title = name;
    this.value = value;
    this.color = color;
  }
}
