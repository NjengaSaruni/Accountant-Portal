import {Circle} from './Circle';
import {Pie} from './Pie';
import {DataObject} from '../BaseChart/DataObject';

import * as _ from 'lodash';
import {BaseChart} from '../BaseChart/BaseChart';

export class PieChart extends BaseChart {
  get unit(): string {
    return this._unit;
  }

  set unit(value: string) {
    this._unit = value;
  }
  get innerCircle(): Circle {
    return this._innerCircle;
  }

  set innerCircle(value: Circle) {
    this._innerCircle = value;
  }
  get total(): number {
    return this._total;
  }
  get pies(): Pie[] {
    return this._pies;
  }
  get padding(): number {
    return this._padding;
  }

  set padding(value: number) {
    this._padding = value;
    this.configure();
  }
  get outerCircle(): Circle {
    return this._outerCircle;
  }

  set outerCircle(value: Circle) {
    this._outerCircle = value;
    this.configure();
  }
  private _outerCircle: Circle;
  private _innerCircle: Circle;
  private _padding = 0;
  private _pies: Pie[] = [];
  private _total = 0;
  private _unit: string;

  public addSector(obj: DataObject) {
    this._total += obj.value;
    const pie = new Pie(obj.value);
    pie.title = obj.title;
    pie.color = obj.color;
    this.add(pie);
  }

  /**
   * Populates a PieChart instance with Pie instances from the given DataObject array.
   * @param data - An array DataObject instances to populate the PieChart
   */
  public populate(data: DataObject[]) {
    for (const dataObject of data) {
      this.addSector(dataObject);
    }
  }

  private configure() {
    this.height = this.outerCircle.diameter + this.padding;
    this.width = this.outerCircle.diameter + this.padding;
  }

  add(pie: Pie) {
    this._pies.push(pie);
    this._pies = _.orderBy(this._pies, 'value', 'desc');
    for (const _pie of this.pies) {
      _pie.angle = (_pie.value / this.total ) * 2 * Math.PI;
      _pie.percentage = (_pie.value / this.total) * 100;
    }
  }

  /**
   * The number of pies in this PieChart
   */
  size(): number {
    return this._pies.length;
  }

  /**
   * Represents a PieChart instance.
   * @param outerRadius - The radius of the PieChart in pixels.
   * @param innerRadius - The radius of the inner circle of the PieChart in pixels.
   */
  constructor(outerRadius: number, innerRadius = 0) {
    super();
    this.outerCircle = new Circle(outerRadius);
    this.innerCircle = new Circle(innerRadius);
  }
}
